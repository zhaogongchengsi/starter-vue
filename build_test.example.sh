# Install dependencies 此脚本放在服务器中
cd /xxx 

pnpm install

pnpm run build

# Copy files to target directory
rm -rf /www/*
cp -rf ./dist/* /www//
