import { icons } from "@/src/lib/icons";
import { TLink } from "./AdvMenuTypes";

export const dashboardMenu = {
  id: "/dashboard",
  miniTitle: "Dashboard",
  title: "Dashboard",
  iconFill: icons.iconSidebarUserFill,
  iconLine: icons.iconSidebarUser,
  show: true,
  subMenu: [],
};

const links: TLink[] = [
  {
    id: "/user",
    miniTitle: "User",
    title: "User",
    iconFill: icons.iconSidebarUserFill,
    iconLine: icons.iconSidebarUser,
    show: true,
    subMenu: [
      {
        id: "/user/list",
        title: "User List",
        iconL: icons.iconSubmenuUser,
        iconF: icons.iconSubmenuUserFill,
      },
      {
        id: "/user/user-properties",
        title: "User Properties",
        iconL: icons.iconSubmenuApplication,
        iconF: icons.iconSubmenuApplicationFill,
      },
      {
        id: "/user/emails",
        title: "Emails",
        iconL: icons.iconSubmenuMail,
        iconF: icons.iconSubmenuMailFill,
      },
      {
        id: "/user/phones",
        title: "Phones",
        iconL: icons.iconSubmenuPhone,
        iconF: icons.iconSubmenuPhoneFill,
      },
      {
        id: "/user/address",
        title: "Address",
        iconL: icons.iconSubmenuAddress,
        iconF: icons.iconSubmenuAddressFill,
      },
      {
        id: "/user/projects",
        title: "Projects",
        iconL: icons.iconSubmenuApplication,
        iconF: icons.iconSubmenuApplicationFill,
      },
    ],
  },
  {
    id: "/billing",
    miniTitle: "Billing",
    title: "Billing",
    iconFill: icons.iconSidebarBillingFill,
    iconLine: icons.iconSidebarBilling,
    show: true,
    subMenu: [
      // {
      //   id: "/billing/dashboard",
      //   title: "Dashboard",
      //   iconL: icons.iconSubmenuDashboard,
      //   iconF: icons.iconSubmenuDashboardFill,
      // },
      {
        id: "/billing/account",
        title: "Accounts",
        iconL: icons.iconSubmenuBillingUser,
        iconF: icons.iconSubmenuBillingUserFill,
      },
      {
        id: "/billing/invoice",
        title: "Sell Invoice",
        iconL: icons.iconSubmenuInvoice,
        iconF: icons.iconSubmenuInvoiceFill,
      },
      {
        id: "/billing/transactions",
        title: "Transactions",
        iconL: icons.iconSubmenuTransaction,
        iconF: icons.iconSubmenuTransactionFill,
      },
      {
        id: "/billing/gateway-transactions",
        title: "Gateway Logs",
        iconL: icons.iconSubmenuGateway,
        iconF: icons.iconSubmenuGatewayFill,
      },
      {
        id: "/billing/archive",
        title: "Archive",
        iconL: icons.iconSubmenuArchive,
        iconF: icons.iconSubmenuArchiveFill,
      },
    ],
  },
  {
    id: "/domain",
    miniTitle: "Domain",
    title: "Domain",
    iconFill: icons.iconSidebarDomainFill,
    iconLine: icons.iconSidebarDomain,
    show: true,
    subMenu: [
      // {
      //   id: "/domain/dashboard",
      //   title: "Dashboard",
      //   iconL: icons.iconSubmenuDashboard,
      //   iconF: icons.iconSubmenuDashboardFill,
      // },
      {
        id: "/domain/pricing?status=active",
        title: "Pricing",
        iconL: icons.iconSubmenuPricing,
        iconF: icons.iconSubmenuPricingFill,
      },
      {
        id: "/domain/list",
        title: "Subscriptions",
        iconL: icons.iconSubmenuDomain,
        iconF: icons.iconSubmenuDomainFill,
      },
      {
        id: "/domain/deleted-domain",
        title: "Deleted Domains",
        iconL: icons.iconSubmenuDeleted,
        iconF: icons.iconSubmenuDeletedFill,
      },
      {
        id: "/domain/archive",
        title: "Archive",
        iconL: icons.iconSubmenuArchive,
        iconF: icons.iconSubmenuArchiveFill,
      },
    ],
  },
  {
    id: "/hosting",
    miniTitle: "Hosting",
    title: "Hosting",
    iconFill: icons.iconSidebarHostingFill,
    iconLine: icons.iconSidebarHosting,
    show: true,
    subMenu: [
      // {
      //   id: "/hosting/dashboard",
      //   title: "Dashboard",
      //   iconL: icons.iconSubmenuDashboard,
      //   iconF: icons.iconSubmenuDashboardFill,
      // },
      {
        id: "/hosting/pricing",
        title: "Pricing",
        iconL: icons.iconSubmenuPricing,
        iconF: icons.iconSubmenuPricingFill,
      },
      {
        id: "/hosting/list",
        title: "Subscriptions",
        iconL: icons.iconSubmenuHosting,
        iconF: icons.iconSubmenuHostingFill,
      },
      {
        id: "/hosting/cpanels",
        title: "CPanels",
        iconL: icons.iconSubmenuCPanel,
        iconF: icons.iconSubmenuCPanelFill,
      },
      {
        id: "/hosting/vendor-config",
        title: "Vendor Configuration",
        iconL: icons.iconSubmenuVendor,
        iconF: icons.iconSubmenuVendorFill,
      },
      {
        id: "/hosting/archive",
        title: "Archive",
        iconL: icons.iconSubmenuArchive,
        iconF: icons.iconSubmenuArchiveFill,
      },
    ],
  },
  {
    id: "/premium",
    miniTitle: "Premium",
    title: "Premium",
    iconFill: icons.iconSidebarPremiumFill,
    iconLine: icons.iconSidebarPremium,
    show: true,
    subMenu: [
      {
        id: "/premium",
        title: "Subscription",
        iconL: icons.iconSubmenuSubscription,
        iconF: icons.iconSubmenuSubscriptionFill,
      },
      {
        id: "/premium/archive",
        title: "Archive",
        iconL: icons.iconSubmenuArchive,
        iconF: icons.iconSubmenuArchiveFill,
      },
    ],
  },
  {
    id: "/appocean",
    miniTitle: "AppOc.",
    title: "AppOcean",
    iconFill: icons.iconSidebarSupportFill,
    iconLine: icons.iconSidebarSupport,
    show: true,
    subMenu: [
      {
        id: "/appocean/apps",
        title: "Apps",
        iconL: icons.iconSubmenuSupport,
        iconF: icons.iconSubmenuSupportFill,
      },
      {
        id: "/appocean/databases",
        title: "Databases",
        iconL: icons.iconSubmenuDatabase,
        iconF: icons.iconSubmenuDatabaseFill,
      },
      {
        id: "/appocean/storage",
        title: "Storage",
        iconL: icons.iconSubmenuStorage,
        iconF: icons.iconSubmenuStorageFill,
      },
      {
        id: "/appocean/proxy",
        title: "Proxy",
        iconL: icons.iconSubmenuProxy,
        iconF: icons.iconSubmenuProxyFill,
      },
      {
        id: "/appocean/load-balancer",
        title: "Load Balancer",
        iconL: icons.iconSubmenuLoadBalancer,
        iconF: icons.iconSubmenuLoadBalancerFill,
      },
      {
        id: "/appocean/tunnels",
        title: "Tunnels",
        iconL: icons.iconSubmenuTunnel,
        iconF: icons.iconSubmenuTunnelFill,
      },
      {
        id: "/appocean/domains",
        title: "Domains",
        iconL: icons.iconSubmenuDomain,
        iconF: icons.iconSubmenuDomainFill,
      },
      {
        id: "/appocean/server-configs",
        title: "Server Configurations",
        iconL: icons.iconSubmenuServerConf,
        iconF: icons.iconSubmenuServerConfFill,
      },
    ],
  },

  {
    id: "/manage",
    miniTitle: "Manage",
    title: "Manage",
    iconFill: icons.iconSidebarManageFill,
    iconLine: icons.iconSidebarManage,
    subMenu: [
      {
        id: "/manage/execution",
        title: "Executions",
        iconL: icons.iconSubmenuExecution,
        iconF: icons.iconSubmenuExecutionFill,
      },
      {
        id: "/manage/application",
        title: "Application",
        iconL: icons.iconSubmenuApplication,
        iconF: icons.iconSubmenuApplicationFill,
      },
      {
        id: "/manage/clients",
        title: "Clients",
        iconL: icons.iconSubmenuClients,
        iconF: icons.iconSubmenuClientsFill,
      },
      {
        id: "/manage/permissions",
        title: "Permissions",
        iconL: icons.iconSubmenuPermission,
        iconF: icons.iconSubmenuPermissionFill,
      },
      {
        id: "/manage/server",
        title: "Server",
        iconL: icons.iconSubmenuServer,
        iconF: icons.iconSubmenuServerFill,
      },
      {
        id: "/manage/currency",
        title: "Currency",
        iconL: icons.iconSubmenuCurrency,
        iconF: icons.iconSubmenuCurrencyFill,
      },
      {
        id: "/manage/payment-methods?currency=USD",
        title: "Payment Methods",
        iconL: icons.iconSubmenuWalletLite,
        iconF: icons.iconSubmenuWalletActive,
      },
      {
        id: "/manage/bank-management",
        title: "Bank Management",
        iconL: icons.iconSubMenuBank,
        iconF: icons.iconSubMenuBAnkFill,
      },
    ],
  },
  {
    id: "/support",
    miniTitle: "Support",
    title: "Support",
    iconFill: icons.iconSidebarSupportFill,
    iconLine: icons.iconSidebarSupport,
    subMenu: [
      {
        id: "/support/tickets-list",
        title: "Tickets List",
        iconL: icons.iconSubmenuSupport,
        iconF: icons.iconSubmenuSupportFill,
      },
    ],
  },
  {
    id: "/blog",
    miniTitle: "Blog",
    title: "Blog",
    iconFill: icons.iconSidebarSupportFill,
    iconLine: icons.iconSidebarSupport,
    subMenu: [
      {
        id: "/blog/list",
        title: "Blog List",
        iconL: icons.iconSubmenuBlog,
        iconF: icons.iconSubmenuBlogFill,
      },
    ],
  },

  {
    id: "/logs",
    miniTitle: "Logs",
    title: "Logs",
    iconFill: icons.iconSidebarLogFill,
    iconLine: icons.iconSidebarLog,
    subMenu: [
      {
        id: "/logs/user-al",
        title: "User AL",
        iconL: icons.iconSubmenuUserActivity,
        iconF: icons.iconSubmenuUserActivityFill,
      },
      {
        id: "/logs/admin-al",
        title: "Admin AL",
        iconL: icons.iconSubmenuAdminActivity,
        iconF: icons.iconSubmenuAdminActivityFill,
      },
      {
        id: "/logs/unlocated-al",
        title: "Unlocated AL",
        iconL: icons.iconSubmenuUnlocatedLog,
        iconF: icons.iconSubmenuUnlocatedLogFill,
      },
      {
        id: "/logs/error-logs",
        title: "Error Logs",
        iconL: icons.iconSubmenuErrorLog,
        iconF: icons.iconSubmenuErrorLogFill,
      },
      {
        id: "/logs/test-logs",
        title: "Test Logs",
        iconL: icons.iconSubmenuUnlocatedLog,
        iconF: icons.iconSubmenuUnlocatedLogFill,
      },
    ],
  },
  {
    id: "/en",
    miniTitle: "E.N.",
    title: "Email Notification",
    iconFill: icons.iconSidebarEmailNotificationFill,
    iconLine: icons.iconSidebarEmailNotification,
    subMenu: [
      {
        id: "/en/configuration",
        title: "Configuration",
        iconL: icons.iconSubmenuEN,
        iconF: icons.iconSubmenuENFill,
      },
    ],
  },

  // {
  //   id: "/api",
  //   miniTitle: "API",
  //   title: "API",
  //   iconFill: icons.iconSidebarApiFill,
  //   iconLine: icons.iconSidebarApi,
  //   subMenu: [
  //     {
  //       id: "/api/access-token",
  //       title: "Access Token",
  //       iconL: icons.iconSubmenuAccessToken,
  //       iconF: icons.iconSubmenuAccessTokenFill,
  //     },
  //   ],
  // },
];

export default links;
