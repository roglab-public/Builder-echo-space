/**
 * 특정 콘솔 경고를 필터링하기 위한 유틸리티
 */

// 원본 콘솔 메서드 저장
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

/**
 * React 및 라이브러리 관련 불필요한 경고 메시지를 필터링합니다.
 */
export const setupConsoleFilters = () => {
  // 콘솔 오류 필터링
  console.error = (...args: any[]) => {
    // defaultProps 관련 경고 무시
    if (
      args.length > 0 &&
      typeof args[0] === "string" &&
      args[0].includes("Support for defaultProps will be removed")
    ) {
      return;
    }

    // 다른 모든 오류는 그대로 출력
    originalConsoleError.apply(console, args);
  };

  // 콘솔 경고 필터링
  console.warn = (...args: any[]) => {
    // 특정 경고 메시지 무시 (필요시 추가)
    if (
      args.length > 0 &&
      typeof args[0] === "string" &&
      (args[0].includes("defaultProps") || args[0].includes("deprecated"))
    ) {
      return;
    }

    // 다른 모든 경고는 그대로 출력
    originalConsoleWarn.apply(console, args);
  };
};

/**
 * 필터를 원래대로 복원합니다.
 */
export const restoreConsoleFilters = () => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
};
