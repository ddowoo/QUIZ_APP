import React, {ReactNode, Suspense, lazy} from 'react';
import {render, renderHook, waitFor} from '@testing-library/react-native';
import {QueryClientProvider} from 'react-query';
import {useQuiz} from '@/hooks/queries/useQuiz';
import ErrorBoundary from 'react-native-error-boundary';
import Loading from '@/components/loading';
import Error from '@/components/error';
import {queryClient} from '../App';

const wrapper = ({children}: {children: ReactNode}) => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

const Questions = lazy(() => import('@/components/screens/quiz/components/questions'));

describe('useQuiz Query', () => {
  it('useQuiz 호출 확인', async () => {
    const {result} = renderHook(() => useQuiz(5, 'easy'), {wrapper});
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.length).toEqual(5);
  });

  it('Questions Component Render Check', async () => {
    const setIsSolving = jest.fn();
    render(
      <ErrorBoundary FallbackComponent={Error}>
        <Suspense fallback={<Loading />}>
          <QueryClientProvider client={queryClient}>
            <Questions isSolving={true} nowSolvingIndex={0} setIsSolving={setIsSolving} />
          </QueryClientProvider>
        </Suspense>
      </ErrorBoundary>,
    );
  });
});
