# 备份

## 数据库备份

```Shell
DUMP=/usr/bin/mongodump
OUT_DIR=/mongoBack/lashi
DATE=`date +%Y-%m-%d`
TAR_DIR=/mongoBack/lashi
DAYS=7

TAR_BAK="mongod_bak_$DATE.tar.gz"
cd $OUT_DIR
rm -rf $OUT_DIR/*
mkdir -p $OUT_DIR/$DATE
$DUMP -h 127.0.0.1:27017 -d lashi -o $OUT_DIR/$DATE
tar -zcvf $TAR_DIR/$TAR_BAK $OUT_DIR/$DATE
find $TAR_DIR/ -mtime +$DAYS -delete

exit
```

# 宝塔 docker管理器

Docker 拉取镜像太慢，需要使用国内的镜像源进行加速。

vim /etc/docker/daemon.json

```JSON
{
"registry-mirrors": [
"http://ovfftd6p.mirror.aliyuncs.com",
"http://registry.docker-cn.com",
"http://docker.mirrors.ustc.edu.cn",
"http://hub-mirror.c.163.com"
],
"insecure-registries": [
"registry.docker-cn.com",
"docker.mirrors.ustc.edu.cn"
],
"debug": true,
"experimental": true
}
```

重启docker服务即可。

systemctl restart docker

# **CentOS7升级Git版本**

阅读目录

 

前言

安装依赖

卸载旧版本

编译安装Git

安装步骤

验证版本

非root用户使用

参考

　　本文记录在CentOS 7.6上升级Git到目前最新版2.23.0。

 

操作步骤参考：centos下升级git版本的操作记录。 本文仅操作和记录。

 

回到顶部

前言

　　CentOS7上的Git版本太陈旧，在使用过程中会遇到问题，因此需要升级git版本。实时上，CentOS系统上各种软件版本都"巨陈旧"，哎...

 

git --version

 

git version 1.8.3.1

　　系统版本：（CentOS 7.6）

 

cat /etc/redhat-release

 

CentOS Linux release 7.6.1810 (Core)

回到顶部

安装依赖

　　源代码安装和编译git，需安装一些依赖。

 

yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel asciidoc

 

yum install  gcc perl-ExtUtils-MakeMaker

 

回到顶部

卸载旧版本

 

yum remove git

 

回到顶部

编译安装Git

　　Git软件包可在此获取：https://mirrors.edge.kernel.org/pub/software/scm/git/。

 

我们选择最新版的：

 

git-2.23.0.tar.xz                                  16-Aug-2019 20:17      5M

回到顶部

安装步骤

复制代码

 

cd /usr/local/src/

 

wget https://mirrors.edge.kernel.org/pub/software/scm/git/git-2.23.0.tar.xz

 

tar -xvf git-2.23.0.tar.xz

 

cd git-2.23.0/

 

make prefix=/usr/local/git all

 

make prefix=/usr/local/git install

 

echo "export PATH=$PATH:/usr/local/git/bin" >> /etc/profile

 

source /etc/profile

 

复制代码

回到顶部

验证版本

[root@localhost  ~]# git --version 

git version 2.23.0





# **ls查看文件大小( M为单位)**

```
ls -lh
```

指定单位

```
ls -l --block-size=g
ls -l --block-size=m
ls -l --block-size=k 
```

# ls 文件大小排序

从大到小 `ls -Sl`  从小到大 `ls -Slr` 