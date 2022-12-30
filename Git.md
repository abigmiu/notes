1. 隐藏当前变更，以便能够切换分支：git stash；
2. 删除分支 `git branch -d branchName`

# 分支改名

切换到需要改名的分支

git branch -m feature/11_12

# 分支备注

git config branch.feature/11_12.description '你要备注的内容'

安装显示工具

npm i -g git-br

cd 进项目文件夹 `git br`

![img](/Users/abigmiu/Documents/notesSyncWithGithub/assets/(null)-20221230222353465.(null))

 

# git reset --soft HEAD^

这样就成功的撤销了你的commit

注意，仅仅是撤回commit操作，您写的代码仍然保留。

# 搜索commit里面的信息

git log --grep=关键字

# 查看某一次commit提交

git show 507379e929ab27f686c0f070ed2a70add6e0b611

以下命令将本地的 master 分支推送到 origin 主机的 master 分支。

$ git push origin master

相等于：

$ git push origin master:master

git push -u是git push --set-upstream的缩写版本啦~

```Shell
git push --set-upstream origin main 的作用是：
```

1.先把本地的当前分支推送到远程仓库origin的main分支

2.然后把本地的当前分支关联到远程仓库origin的main分支

即相当于 git push origin main 加上 git branch --set-upstream-to=origin/main main的作用，即先把本地分支push到远程仓库中，然后再建立本地分支与远程分支的关联。

# 统计代码行数

```Bash
git log --format='%aN' | sort -u | while read name; do echo -en "$name\t"; git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -; done
```