FROM nginx:1.27-alpine

# Nginx 설정 복사
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# 빌드 산출물 복사
COPY dist/ /usr/share/nginx/html

HEALTHCHECK CMD wget -qO- http://127.0.0.1/ || exit 1

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]