import { Authority } from "@/types/user";
import { Get } from "@/utils";

export const getAuthorities = () => {
  return Get<Authority[]>("/auth/authorities");
};

export const authoritiesTree = (auths: Authority[]) => {
  // 定义树形结构数据的根节点
  const root = [];
  // 定义以角色 id 为键的对象
  const map = new Map<number, Authority & { children: Authority[] }>();

  // 遍历扁平数据，将每个角色存储到 map 对象中
  for (const item of auths) {
    // 将角色数据存储到 map 对象中
    map.set(item.id, { ...item, children: [] });
  }

  // 遍历扁平数据，将每个角色的子角色存储到其父角色的 children 数组中
  for (const item of auths) {
    // 如果当前角色有父角色，则将其存储到父角色的 children 数组中
    if (item.pid !== 0) {
      const pi = map.get(item.pid);
      const ci = map.get(item.id);
      if (pi && ci) {
        pi.children.push(ci);
      }
      // map[item.pid].children.push(map[item.id]);
    }
  }

  // 遍历扁平数据，找到所有没有父角色的角色，将它们作为根节点，构建树形结构数据
  for (const item of auths) {
    // 如果当前角色没有父角色，则将其作为根节点添加到根节点数组中
    if (item.pid === 0) {
      const ci = map.get(item.id);
      if (ci) {
        root.push(ci);
      }
    }
  }

  return root
};
