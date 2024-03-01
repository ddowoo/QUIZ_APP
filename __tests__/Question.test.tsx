import React, {ReactNode, Suspense, lazy} from 'react';
import {render, renderHook, waitFor} from '@testing-library/react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {useQuiz} from '@/hooks/queries/useQuiz';
import ErrorBoundary from 'react-native-error-boundary';
import Loading from '@/components/loading';
import Error from '@/components/error';

const queryClient = new QueryClient();
const wrapper = ({children}: {children: ReactNode}) => {
  return (
    <ErrorBoundary FallbackComponent={Error}>
      <Suspense fallback={<Loading />}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
};

const Questions = lazy(
  () => import('@/components/screens/quiz/components/questions'),
);

describe('useQuiz Query', () => {
  //   it('useQuiz 호출 확인', async () => {
  //     const {result} = renderHook(() => useQuiz(5, 'easy'), {wrapper});
  //     console.log(result.current);
  //     await waitFor(() => expect(result.current.isSuccess).toBe(true));
  //   });

  it('Questions Component Render Check', async () => {
    const setIsSolving = jest.fn();
    const {getAllByLabelText, debug} = render(
      <ErrorBoundary FallbackComponent={Error}>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loading />}>
            <Questions
              isSolving={true}
              nowSolvingIndex={0}
              setIsSolving={setIsSolving}
            />
          </Suspense>
        </QueryClientProvider>
      </ErrorBoundary>,
    );
  });
});
