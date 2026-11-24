# Flare Dive 홈페이지

공개 주소: https://byunggilyou-cyber.github.io

## 무엇을 어디서 고치는가

| 바꾸고 싶은 것 | 고칠 파일 |
|---|---|
| 문구, 요금, FAQ, 숙소, 연락처, 카카오톡 링크 | `content/text.yml` |
| 어떤 사진을 어디에 쓸지 | `content/images.yml` |
| 사진 파일 추가 | `images` 폴더에 올리기 |
| 색, 글꼴, 간격 (디자인) | `style.css` |
| 페이지 구조 (섹션 추가 등) | `templates/index.html` |

대부분의 수정은 **`content/text.yml`과 `content/images.yml` 두 파일**만 고치면 됩니다.

## 고치는 순서 (GitHub 웹사이트에서)

1. 고칠 파일(예: `content/text.yml`)을 엽니다.
2. 오른쪽 위 연필 아이콘(Edit)을 누릅니다.
3. 따옴표(" ") 안의 글자만 고칩니다.
4. 초록색 **Commit changes** 버튼을 누릅니다.
5. 1~2분 뒤 홈페이지에 자동으로 반영됩니다.

진행 상황은 저장소 상단 **Actions** 탭에서 볼 수 있습니다. 초록색 체크는 성공, 빨간색 X는 실패입니다. 실패하면 대부분 따옴표가 빠졌거나 줄 앞 칸(들여쓰기)이 어긋난 경우입니다.

## 사진 바꾸는 순서

1. `images` 폴더를 열고 **Add file → Upload files**로 사진을 올립니다. 파일 이름은 영문과 숫자로 합니다.
2. `content/images.yml`에서 바꿀 자리의 `file:` 값을 새 파일 이름으로 고칩니다.
3. Commit changes를 누릅니다.

## 파일 구성

```
content/
  text.yml        문구
  images.yml      사진 지정
images/           사진 파일
templates/
  index.html      홈페이지 틀 (문구·사진이 들어갈 자리)
style.css         디자인
site.js           휴대폰 메뉴 동작
build.py          문구 + 사진 + 틀을 합쳐 홈페이지를 만드는 프로그램
.github/workflows/deploy.yml   저장할 때마다 build.py를 자동 실행하는 설정
```

완성된 홈페이지 파일(`index.html`)은 저장소에 두지 않고, 저장할 때마다 자동으로 만들어집니다.

## 내 컴퓨터에서 미리 보기 (선택)

```
pip install pyyaml jinja2
python build.py
```

`_site/index.html`을 브라우저로 열면 됩니다.
