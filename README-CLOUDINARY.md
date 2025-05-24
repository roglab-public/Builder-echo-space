# Cloudinary 설정 가이드 (비개발자용)

이 가이드는 Cloudinary를 사용하여 이미지를 호스팅하고 웹사이트에 적용하는 방법을 설명합니다. 개발자가 아니더라도 쉽게 따라할 수 있습니다.

## 1. Cloudinary 계정 만들기

1. [Cloudinary 사이트](https://cloudinary.com/users/register/free)에 접속합니다.
2. 무료 계정 가입 양식을 작성하고 계정을 생성합니다.
3. 가입 후 대시보드로 이동합니다.
4. 대시보드에서 "Cloud name"을 찾아 메모해 둡니다. (예: "demo12345")

## 2. 이미지 업로드하기

### 방법 1: 직접 업로드 (가장 쉬운 방법)

1. Cloudinary 대시보드에서 왼쪽 메뉴의 "Media Library"를 클릭합니다.
2. 오른쪽 상단의 "Upload" 버튼을 클릭합니다.
3. 컴퓨터에서 이미지 파일을 선택하거나, 끌어서 놓습니다.
4. 업로드가 완료되면 이미지를 클릭합니다.
5. 오른쪽 패널에서 "Copy URL" 버튼을 클릭하여 이미지 URL을 복사합니다.

### 방법 2: 폴더 구조로 정리하기 (추천)

1. "Media Library"에서 "New folder" 버튼을 클릭하여 폴더를 생성합니다 (예: "slot_machines").
2. 생성된 폴더를 클릭하여 이동합니다.
3. "Upload" 버튼을 클릭하여 이미지를 폴더에 업로드합니다.
4. 이미지 이름을 슬롯 머신 이름과 관련있게 지정하면 나중에 찾기 쉽습니다.

## 3. Cloudinary URL 가져오기

1. 업로드한 이미지를 클릭합니다.
2. 오른쪽 패널에서 "Copy URL" 버튼을 찾아 클릭합니다.
3. URL이 클립보드에 복사됩니다.

**복사된 URL 예시:**

```
https://res.cloudinary.com/demo12345/image/upload/v1623456789/slot_machines/fortune_dragon.jpg
```

## 4. 웹사이트에 URL 적용하기

1. 슬롯 머신 관리 페이지에서 이미지 URL 입력 필드를 찾습니다.
2. 복사한 Cloudinary URL을 붙여넣습니다.

### 메인 이미지 설정하기:

- 슬롯 머신 추가/편집 페이지에서 "메인 이미지 URL" 필드에 복사한 URL을 붙여넣습니다.

### 스크린샷 추가하기:

- "스크린샷" 섹션에서 각 필드에 스크린샷 URL을 붙여넣습니다.
- 최대 10개까지 추가할 수 있습니다.
- 마지막 필드에 URL을 입력하면 자동으로 새 필드가 추가됩니다.

## 5. Cloudinary URL 형식 이해하기 (선택 사항)

기본 Cloudinary URL 형식:

```
https://res.cloudinary.com/[cloud_name]/image/upload/[transformations]/[public_id].[format]
```

- **cloud_name**: 본인의 Cloudinary 클라우드 이름
- **transformations**: 이미지 변환 옵션 (크기, 품질 등)
- **public_id**: 이미지 식별자 (폴더 포함)
- **format**: 이미지 형식 (jpg, png 등)

### 유용한 URL 변환 옵션:

- **크기 조정**: `w_800,h_600,c_fill` (너비 800px, 높이 600px, 채우기 방식)
- **품질 최적화**: `q_auto` (자동 품질 최적화)
- **포맷 변환**: `f_auto` (자동 포맷 변환)

예시:

```
https://res.cloudinary.com/demo12345/image/upload/w_800,h_600,c_fill,q_auto,f_auto/slot_machines/fortune_dragon.jpg
```

## 자주 묻는 질문 (FAQ)

### Q: 이미지가 표시되지 않습니다. 어떻게 해야 하나요?

A: URL이 올바른지 확인하세요. Cloudinary 대시보드에서 이미지를 다시 클릭하고 URL을 복사해보세요.

### Q: 이미지 크기를 조정하고 싶어요. 어떻게 해야 하나요?

A: Cloudinary 대시보드에서 이미지를 선택한 후 "Edit" 버튼을 클릭하여 크기를 조정할 수 있습니다. 또는 URL에 `w_너비,h_높이` 변환 옵션을 추가하세요.

### Q: 무료 계정의 제한은 무엇인가요?

A: 무료 계정은 매월 25GB 스토리지와 50,000회 변환을 제공합니다. 일반적인 사용에는 충분합니다.

### Q: 이미지가 너무 느리게 로드됩니다.

A: URL에 `q_auto,f_auto` 변환 옵션을 추가하여 자동 최적화를 사용해보세요.

### Q: 로컬 컴퓨터에서 이미지를 삭제해도 괜찮나요?

A: 네, Cloudinary에 업로드한 후에는 로컬 이미지를 삭제해도 됩니다. 이미지는 Cloudinary 서버에 안전하게 저장됩니다.

---

이 가이드에 대해 질문이 있으시면 관리자에게 문의하세요.
