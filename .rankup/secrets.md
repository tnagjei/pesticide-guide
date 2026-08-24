# 密钥登记

| name | purpose | environment | provider/storage location | owner | access status | rotated at | next rotation |
|---|---|---|---|---|---|---|---|
| GSC OAuth credentials | 读取 Search Console 数据 | production | `/Users/tangjei/.config/gsc-api/` 全局凭据目录 | 用户 | available | never | 待定 |
| Vercel deployment credentials | 部署站点 | production | 待确认，未读取真实值 | 用户 | restricted | never | 待定 |

仅登记名称和存放位置，不保存真实凭据、token 或授权头。
