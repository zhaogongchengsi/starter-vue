# Install dependencies
cd /xxx 

pnpm install

pnpm run build

# Copy files to target directory
rm -rf /www/*
cp -rf ./dist/* /www//
