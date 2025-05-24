/**
 * Cloudinary 이미지 관련 유틸리티 함수
 */

// Cloudinary 기본 URL 설정 (자신의 클라우드 이름으로 변경 필요)
const CLOUDINARY_CLOUD_NAME = "your-cloud-name";
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Cloudinary 이미지 URL 생성
 * @param publicId 이미지의 public ID
 * @param options 변환 옵션 (크기, 품질 등)
 */
export const getCloudinaryUrl = (
  publicId: string,
  options: {
    width?: number;
    height?: number;
    crop?: "fill" | "scale" | "fit" | "thumb";
    quality?: number;
    format?: "auto" | "webp" | "jpg" | "png";
  } = {},
): string => {
  const {
    width,
    height,
    crop = "fill",
    quality = "auto",
    format = "auto",
  } = options;

  // 변환 옵션 문자열 생성
  let transformations = "f_auto,q_auto"; // 기본 최적화: 자동 포맷 및 품질

  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  if (crop) transformations += `,c_${crop}`;

  return `${CLOUDINARY_BASE_URL}/${transformations}/${publicId}`;
};

/**
 * 이미지 URL이 Cloudinary URL인지 확인
 */
export const isCloudinaryUrl = (url: string): boolean => {
  return url?.includes("cloudinary.com");
};

/**
 * 다양한 이미지 소스를 처리하여 최적화된 이미지 URL 반환
 * - Cloudinary URL인 경우 그대로 사용
 * - Google Drive URL인 경우 적절한 형식으로 변환 시도
 */
export const getOptimizedImageUrl = (
  url: string,
  options: { width?: number; height?: number; quality?: number } = {},
): string => {
  if (!url) return "/placeholder.svg";

  // 이미 Cloudinary URL인 경우
  if (isCloudinaryUrl(url)) {
    // 이미 변환 옵션이 있다면 그대로 반환, 아니면 기본 최적화 추가
    if (url.includes("/image/upload/")) {
      if (url.match(/\/[a-z_]+,/)) {
        return url; // 이미 변환 옵션이 있음
      }
      // 기본 최적화 추가
      const [baseUrl, publicId] = url.split("/image/upload/");
      return `${baseUrl}/image/upload/f_auto,q_auto/${publicId}`;
    }
    return url;
  }

  // Google Drive URL인 경우 (fallback - Cloudinary로 마이그레이션하기 전까지만 사용)
  if (
    url.includes("drive.google.com") ||
    url.includes("lh3.googleusercontent.com")
  ) {
    // Google Drive ID 추출
    let fileId = null;

    // Format: https://drive.google.com/file/d/FILE_ID/view
    const filePathMatch = url.match(/\/file\/d\/([^/]+)/);
    if (filePathMatch && filePathMatch[1]) {
      fileId = filePathMatch[1];
    }

    // Format: https://drive.google.com/uc?export=view&id=FILE_ID
    const exportViewMatch = url.match(/[?&]id=([^&]+)/);
    if (!fileId && exportViewMatch && exportViewMatch[1]) {
      fileId = exportViewMatch[1];
    }

    if (fileId) {
      // 가장 안정적인 Google 이미지 URL 형식 사용
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  // 그 외의 경우 원본 URL 반환
  return url;
};

/**
 * Cloudinary로 이미지를 업로드하는 함수
 * (실제 구현은 백엔드 또는 Cloudinary SDK 필요)
 */
export const uploadToCloudinary = async (
  file: File,
): Promise<{ publicId: string; url: string } | null> => {
  // 여기에 실제 Cloudinary 업로드 로직 구현
  // 일반적으로 백엔드 API를 통해 처리하거나 Cloudinary SDK 사용

  // 예시 코드 (실제로는 구현 필요):
  try {
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await fetch('/api/upload-to-cloudinary', {
    //   method: 'POST',
    //   body: formData
    // });
    // const data = await response.json();
    // return {
    //   publicId: data.public_id,
    //   url: data.secure_url
    // };

    // 임시 응답
    console.warn("Cloudinary 업로드 기능이 구현되지 않았습니다.");
    return null;
  } catch (error) {
    console.error("Cloudinary 업로드 오류:", error);
    return null;
  }
};
