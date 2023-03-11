setup:
	git submodule init
	git submodule update

build:
	# 打包 memos/web 为静态文件
	cd memos/web && yarn build
	# 文件打包到 memos/server/static 目录下
	cp -r memos/web/dist memos/server
	# 打包 memos/server 为二进制文件
	cd memos && go build -o memos ./main.go
	# 移动二进制文件到 release/app/bin 目录下, 如果目录不存在则创建
	cd memos && mv memos ../release/app/bin
	# 清空 git submodule memos 目录改动
	cd memos && git clean -f -d

w-build:
	# 打包 memos/web 为静态文件
	cd memos/web && yarn build
	# 文件打包到 memos/server/static 目录下
	cp -r memos/web/dist memos/server
	# 打包 memos/server 为二进制文件
	cd memos && CGO_ENABLED=1 go build -o memos ./main.go
	# 移动二进制文件到 release/app/bin 目录下, 如果目录不存在则创建
	cd memos && mv memos ../release/app/bin/memos.exe
	# 清空 git submodule memos 目录改动
	cd memos && git clean -f -d