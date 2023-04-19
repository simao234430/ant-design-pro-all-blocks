import { Settings as LayoutSettings } from "@ant-design/pro-layout";
import { Mode, UseSwitchTabsOptions } from "use-switch-tabs";

export type SwitchTabsOptions = {
  mode: Mode;
  /** 固定标签页头部 */
  fixed?: boolean;
  /** 是否在顶栏显示刷新按钮 */
  reloadable?: boolean;
} & Pick<UseSwitchTabsOptions, "persistent">;

const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  tabsLayout?: boolean;
  switchTabs?: SwitchTabsOptions;
  apiBasePath?: "http://localhost:8088/";
} = {
  navTheme: "light",
  // 拂晓蓝
  primaryColor: "#1890ff",
  layout: "mix",
  contentWidth: "Fluid",
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  title: "Ant Design Pro",
  pwa: false,
  logo: "https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg",
  // tabsLayout: true,
  switchTabs: {
    mode: Mode.Route,
    fixed: true,
    reloadable: false,
    persistent: {
      force: false,
    },
  },
  iconfontUrl: "",
};

export default Settings;
