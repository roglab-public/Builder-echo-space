import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * 차트 컴포넌트를 위한 ErrorBoundary
 *
 * 차트 렌더링 중 오류가 발생하면 폴백 UI를 표시합니다.
 */
class ChartErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태 업데이트
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Chart Error:", error);
    console.error("Error Info:", errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="border border-[#333333] rounded-lg p-4 bg-[#1f1f1f] text-center py-12">
            <p className="text-[#999999] mb-2">차트를 불러올 수 없습니다</p>
            <button
              className="px-3 py-1 bg-[#333333] text-[#999999] rounded text-sm hover:bg-[#444444]"
              onClick={() => this.setState({ hasError: false, error: null })}
            >
              다시 시도
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ChartErrorBoundary;
