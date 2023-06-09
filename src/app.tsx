import type { Settings as LayoutSettings } from "@ant-design/pro-layout";
import { SettingDrawer } from "@ant-design/pro-layout";
import { PageLoading } from "@ant-design/pro-layout";
import type { RunTimeLayoutConfig } from "umi";
import { history, Link } from "umi";
import RightContent from "@/components/RightContent";
import SwitchTabsLayout from "./layouts/TabsLayout";
import Footer from "@/components/Footer";
import { BookOutlined, LinkOutlined } from "@ant-design/icons";
import defaultSettings from "../config/defaultSettings";
import { getRoutersInfo, getUserInfo } from "./services/ant-design-pro/session";
import TabLayout from "./components/page_tab/TabLayout";

const isDev = process.env.NODE_ENV === "development";
const loginPath = "/user/login";

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const resp = await getUserInfo();
      if (resp === undefined || resp.code !== 200) {
        history.push(loginPath);
      } else {
        return {
          ...resp.user,
          permissions: resp.permissions,
        } as API.CurrentUser;
      }
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      settings: defaultSettings,
      currentUser,
      fetchUserInfo,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}) => {
  const { switchTabs, ...restSettings } = initialState?.settings || {};
  return {
    rightContentRender: () => (
      <RightContent
        switchTabsReloadable={switchTabs?.mode && switchTabs.reloadable}
      />
    ),
    disableContentMargin: false,
    // waterMarkProps: {
    //   content: initialState?.currentUser?.name,
    // },
    className: switchTabs?.mode && "custom-by-switch-tabs",
    footerRender: () => <Footer />,

    // links: isDev
    //   ? [
    //       <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //         <LinkOutlined />
    //         <span>OpenAPI 文档</span>
    //       </Link>,
    //       <Link to="/~docs" key="docs">
    //         <BookOutlined />
    //         <span>业务组件文档</span>
    //       </Link>,
    //     ]
    //   : [],
    menuHeaderRender: undefined,
    menu: {
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.userId,
      },
      request: async () => {
        if (!initialState?.currentUser?.userId) {
          return [];
        }
        // initialState.currentUser 中包含了所有用户信息
        const menus = await getRoutersInfo();
        setInitialState((preInitialState) => ({
          ...preInitialState,
          menus,
        }));
        return menus;
      },
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        // router.push(location);
        console.log("onPageChange");
        console.log(location);
        history.push(location);
      }
    },

    childrenRender: (children, props) => {
      const { route } = props;
      const contextMenuLabels = {
        closeTab: "关闭标签",
        closeRightTabs: "关闭右侧标签",
        closeAllTabs: "关闭所有标签",
      };

      // if (initialState?.loading) return <PageLoading />;
      return (
        // <SwitchTabs></SwitchTabs>
        // <MyTabLayout {...props}>{children}</MyTabLayout>
        switchTabs?.hidenAntTabs ? (
          children
        ) : (
          <TabLayout {...props} contextMenuLabels={contextMenuLabels} />
        )

        // <SwitchTabsLayout
        //   mode={switchTabs?.mode}
        //   persistent={{ force: false }}
        //   fixed={switchTabs?.fixed}
        //   routes={route!.routes}
        // >
        //   <div>
        //     {children}
        //     {!props.location?.pathname?.includes("/login") && (
        //       <SettingDrawer
        //         disableUrlParams
        //         enableDarkTheme
        //         settings={initialState?.settings}
        //         onSettingChange={(settings) => {
        //           setInitialState((preInitialState) => ({
        //             ...preInitialState,
        //             settings,
        //           }));
        //         }}
        //       />
        //     )}
        //   </div>
        // </SwitchTabsLayout>
      );
    },
    // ...initialState?.settings,
    ...restSettings,
  };
};
