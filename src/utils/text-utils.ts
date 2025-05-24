/**
 * 텍스트 유틸리티 함수
 */

/**
 * 문장마다 줄바꿈을 추가하는 함수
 * 
 * @param text 원본 텍스트
 * @returns 문장마다 줄바꿈이 추가된 텍스트
 */
export const addLineBreaksAfterSentences = (text: string): string => {
  if (!text) return '';
  
  // 문장의 끝으로 간주하는 패턴: 마침표, 느낌표, 물음표 다음에 공백이나 줄바꿈이 있는 경우
  // '.' 다음에 숫자가 오는 경우는 제외 (예: 0.5)
  return text
    .replace(/([.!?])\s+/g, '$1\n')  // 문장 끝에 줄바꿈 추가
    .replace(/([.!?])$/g, '$1\n')    // 텍스트 끝에 마침표가 있는 경우
    .replace(/(\d+)\.\n(\d+)/g, '$1.$2')  // 소수점이 있는 경우 줄바꿈 원복 (0.5 등)
    .trim();  // 앞뒤 공백 제거
};

/**
 * HTML 안전한 형식으로 줄바꿈이 포함된 텍스트 반환
 * 
 * @param text 원본 텍스트
 * @returns 줄바꿈이 포함된 JSX
 */
export const renderWithLineBreaks = (text: string): JSX.Element => {
  const textWithBreaks = addLineBreaksAfterSentences(text);
  
  // 줄바꿈을 <br />로 변환
  return (
    <>
      {textWithBreaks.split('\n').map((line, index, array) => (
        <React.Fragment key={index}>
          {line}
          {index < array.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
};