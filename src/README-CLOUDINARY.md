# Cloudinary 설정 가이드

Google Drive에서 Cloudinary로의 이미지 마이그레이션을 위한 가이드입니다.

## 1. Cloudinary 계정 설정

1. [Cloudinary](https://cloudinary.com/)에 가입하고 무료 계정을 생성합니다.
2. 대시보드에서 클라우드 이름(cloud name)을 확인합니다.
3. `src/lib/cloudinary-utils.ts` 파일에서 `CLOUDINARY_CLOUD_NAME` 변수를 본인의 클라우드 이름으로 업데이트합니다.

## 2. 이미지 업로드 방법

### 방법 1: Cloudinary 대시보드를 통한 업로��

1. Cloudinary 대시보드에 로그인합니다.
2. Media Library로 이동한 다음 "Upload" 버튼을 클릭합니다.
3. 로컬 파일 또는 URL로 이미지를 업로드합니다.
4. 업로드 후 생성된 Public ID를 메모해 둡니다.

### 방법 2: 프로그래매틱 업로드 (백엔드 필요)

백엔드를 구현할 경우, 다음과 같은 코드를 사용하여 이미지를 업로드할 수 있습니다:

```javascript
// 백엔드 예시 코드 (Node.js + Express)
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Cloudinary 구성
cloudinary.config({
  cloud_name: "your_cloud_name",
  api_key: "your_api_key",
  api_secret: "your_api_secret",
});

// 파일 업로드 엔드포인트
app.post(
  "/api/upload-to-cloudinary",
  upload.single("file"),
  async (req, res) => {
    try {
      // Cloudinary에 파일 업로드
      const result = await cloudinary.uploader.upload(req.file.path);

      // 응답
      res.json({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
    } catch (error) {
      console.error("Upload error:", error);
      res.status(500).json({ error: "Upload failed" });
    }
  },
);
```

## 3. Cloudinary URL 사용

��로드된 이미지의 URL은 다음 형식을 갖습니다:

```
https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.{format}
```

### 변환 옵션 예시

- 크기 조정: `w_500,h_300,c_fill`
- 품질 최적화: `q_auto`
- 포맷 자동 변환: `f_auto`
- 효과 적용: `e_sepia`

전체 URL 예시:

```
https://res.cloudinary.com/demo/image/upload/w_500,h_300,c_fill,q_auto,f_auto/sample
```

## 4. 데이터 마이그레이션

Google Drive 이미지를 Cloudinary로 마이그레이션하려면:

1. Google Drive에서 모든 이미지를 다운로드합니다.
2. Cloudinary에 이미지를 업로드합니다.
3. `src/data/slot-machines.ts` 파일에서 모든 `imageUrl` 값을 해당 Cloudinary URL로 변경합니다.

예시:

```typescript
// 변경 전 (Google Drive)
imageUrl: "https://drive.google.com/uc?export=view&id=1lQfNBmauUTP_W4ag46AwLYlbXNDPummD";

// 변경 후 (Cloudinary)
imageUrl: "https://res.cloudinary.com/your_cloud_name/image/upload/slot_machines/fortune_dragon";
```

## 5. CloudinaryImage 컴포넌트 사용

애플리케이션에서 이미지를 표시하려면 CloudinaryImage 컴포넌트를 사용하세요:

```jsx
import { CloudinaryImage } from "@/components/ui/cloudinary-image";

// 기본 사용법
<CloudinaryImage
  src="cloudinary_public_id_or_url"
  alt="이미지 설명"
/>

// 추가 옵션 사용
<CloudinaryImage
  src="cloudinary_public_id_or_url"
  alt="이미지 설명"
  width={500}
  height={300}
  objectFit="cover"
  className="rounded-lg"
/>
```

이 컴포넌트는 다음 기능을 제공합니다:

- 로딩 상태 관리
- 오류 처리 및 대체 이미지 표시
- 이미지 URL 최적화

## 중요 참고 사항

- 현재 구현은 프론트엔드 전용입니다. 실제 업로드 기능을 활성화하려면 백엔드 API를 구현해야 합니다.
- Cloudinary 무료 계정에는 매월 25 크레딧의 사용량 제한이 있습니다.
- 자세한 내용은 [Cloudinary 공식 문서](https://cloudinary.com/documentation)를 참조하세요.
