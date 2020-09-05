## create增
> db.集合名.insert(JSON数据)

#### 查看集合数据
> db.cl.find()
- 注意：不存在的数据库和集合会隐式创建
- 注意: 插入的数据会分配一个id
- id的组成: 是一个由24位16进制数字组成的字符串  12字节（一个字节两位）

### 插入多条数据 数据里包含json数据
> db.c1.isnert([{},{}])

### 插入多条数据
- 因为mongodb是C语言写的, 底层是js引擎, 所以支持部分js语法, 可以写foer循环
```
for(var i = 0; i <= 10; i++){  
  db.c1.insert({username: 'user' + i, age: i})  
}
```

## Retrieve 查
> db.集合名.find(条件 ,[,查询的列])
- 条件
  查询所有数据 {}或者不写  
  查询age=6的数据 {age: 6}  
  既要age=6又要sex=男 {age: 6, sex:'男'}  

- 可选参数
  不写 查询所有的列  
  {age: 1} 只显示age列  
  {age: 0} 除了age列都显示  

> db.集合名.find().pretty()  格式化表 美化

### 升级语法
> db.集合名.find({
  键: {运算符:值}
})

运算符|作用
--|--
$gt | 大于
$gte | 大于等于
$lt | 小于
$lte | 小于等于
$ne | 不等于
$in | in  eg: db.c1.find({age: [5,8,10]}) 查询5岁、8岁、10岁的
$nin | not in


## update 改
> db.集合名.update(条件, 新数据[,是否新增，是否修改多条])

- 是否新增： 条件匹配不到则插入  true插入  false不插入（默认 ）
- 是否修改多条： 匹配成功数据都修改 true是 false否（默认）

### 升级语法
> db.集合名.update(条件, 新数据)  
新数据 {修改器: {键: 值}}

修改器| 作用
--|--
$inc | 递增
$rename | 重命名列
$set | 修改列值
$unset | 删除列

## delete 删
> db.集合名.remove(条件, [,是否删除一条])
- 注意: 是否删除一条 true 是  false 否（默认）