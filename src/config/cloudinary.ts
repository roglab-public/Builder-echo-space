/**
 * Cloudinary 설정 파일
 *
 * 이 파일은 Cloudinary 관련 설정을 관리합니다.
 * 여기에 클라우드 이름과 기타 설정을 지정할 수 있습니다.
 */

// Cloudinary 클라우드 이름 (로컬 스토리지에서 가져옴)
export const CLOUDINARY_CLOUD_NAME =
  typeof window !== "undefined"
    ? localStorage.getItem("cloudinary_cloud_name") || "your-cloud-name"
    : "your-cloud-name";

// Cloudinary 기본 URL 생성
export const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;

/**
 * Cloudinary 이미지 URL 생성 함수
 *
 * @param publicId 이미지의 public ID 또는 전체 URL
 * @param options 변환 옵션 (width, height 등)
 * @returns 최적화된 Cloudinary URL
 */
export const getCloudinaryUrl = (
  publicIdOrUrl: string,
  options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "auto" | "webp" | "jpg" | "png";
    crop?: "fill" | "scale" | "fit" | "thumb";
  } = {},
) => {
  // 기본 옵션 설정
  const {
    width,
    height,
    quality = "auto",
    format = "auto",
    crop = "fill",
  } = options;

  // 이미 완전한 URL인 경우 (Cloudinary URL 포함) 그대로 반환
  if (publicIdOrUrl.startsWith("http")) {
    // Cloudinary URL인 경우 변환 옵션 추가
    if (publicIdOrUrl.includes("cloudinary.com")) {
      // 이미 변환 옵션이 있는지 확인
      if (publicIdOrUrl.includes("/upload/")) {
        const [baseUrl, imageId] = publicIdOrUrl.split("/upload/");

        // 이미 변환 옵션이 있으면 그대로 반환
        if (imageId.includes("/")) {
          return publicIdOrUrl;
        }

        // 변환 옵션 추가
        return `${baseUrl}/upload/f_${format},q_${quality}${width ? `,w_${width}` : ""}${height ? `,h_${height}` : ""}${crop ? `,c_${crop}` : ""}/${imageId}`;
      }
    }
    return publicIdOrUrl;
  }

  // Public ID만 있는 경우 전체 URL 구성
  let transformations = `f_${format},q_${quality}`;
  if (width) transformations += `,w_${width}`;
  if (height) transformations += `,h_${height}`;
  if (crop) transformations += `,c_${crop}`;

  return `${CLOUDINARY_BASE_URL}/${transformations}/${publicIdOrUrl}`;
};

/**
 * 이미지 URL이 Cloudinary URL인지 확인
 */
export const isCloudinaryUrl = (url: string): boolean => {
  return url?.includes("cloudinary.com");
};

/**
 * 일반 URL을 Cloudinary URL로 변환 (이미 Cloudinary URL이면 그대로 반환)
 */
export const convertToCloudinaryUrl = (url: string): string => {
  if (!url) return "";
  if (isCloudinaryUrl(url)) return url;

  // Cloudinary에 이미지가 업로드되지 않은 경우, 원본 URL 반환
  return url;
};
