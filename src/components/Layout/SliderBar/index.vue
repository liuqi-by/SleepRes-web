<template>
    <div
        :class="{ 'has-logo': isShowLogo && width > 1250 && !isCollapse }"
        ref="navbar"
    >
        <!-- logo -->

        <Logo
            v-if="isShowLogo && width > 1250 && !isCollapse"
            ref="navbarLogo"
        />

        <!-- 菜单，key防止变化时默认菜单打开的情况 -->
        <!-- 这里菜单写死，是因为elementplus的bug，暂时没有解决办法，发现v-for以及注释都会影响elementplus的计算，导致省略不准，遗留大量空白 -->

        <el-scrollbar :key="layout">
            <el-menu
                :default-active="route.path"
                :collapse="isCollapse"
                :unique-opened="false"
                :collapse-transition="false"
                :mode="layout === LayoutEnum.LEFT || device === DeviceEnum.MOBILE ? 'vertical' : 'horizontal'"
                router
                v-if="permission_routes.length > 1"
            >
                <el-menu-item
                    :title="$t(`router.${item.meta?.title}`)"
                    v-for="item in permission_routes"
                    :key="item.path"
                    :index="item.path"
                >
                    <span>{{ $t(`router.${item.meta?.title}`) }}</span>
                </el-menu-item>
                <!-- <el-menu-item
                    index="/admin"
                    :title="$t(`router.patients`)"
                    v-if="haveRoles(['superAdmin'])"
                >
                    <span>{{ $t(`router.admin`) }}</span>
                </el-menu-item>
                <el-menu-item
                    index="/patients"
                    :title="$t(`router.patients`)"
                    v-if="haveRoles(['patients'])"
                >
                    <span>{{ $t(`router.patients`) }}</span>
                </el-menu-item>
                <el-menu-item
                    index="/users"
                    :title="$t(`router.users`)"
                    v-if="haveRoles(['users'])"
                >
                    <span>{{ $t(`router.users`) }}</span>
                </el-menu-item>
                <el-menu-item
                    index="/organization"
                    :title="$t(`router.organization`)"
                    v-if="haveRoles(['organization'])"
                >
                    <span>{{ $t(`router.organization`) }}</span>
                </el-menu-item> -->
            </el-menu>
        </el-scrollbar>

        <!-- 右侧菜单 -->
        <NavbarRight
            v-if="layout === LayoutEnum.TOP && device === DeviceEnum.DESKTOP"
            ref="navbarRight"
        />
    </div>
</template>

<script setup lang="ts">
    import NavbarRight from '../Navbar/NavbarRight.vue';
    import Logo from './components/Logo.vue';

    // import SidebarItem from './components/SidebarItem.vue';
    // import AppLink from './components/Link.vue';
    import { useAppStore } from '@/stores/modules/app';
    import { usePermissionStore } from '@/stores/modules/permission';

    import { DeviceEnum, LayoutEnum } from '~/enums/AppSettingsEnum';
    const appStore = useAppStore();
    const { width } = useWindowSize();
    const permissionStore = usePermissionStore();
    const permission_routes = computed(() =>
        permissionStore.permissionRoutes.filter(route => route.meta?.title && !route.meta.hidden),
    );
    // console.log(permission_routes);

    // 是否显示logo
    const isShowLogo = computed(() => appStore.device === DeviceEnum.DESKTOP);
    // 侧边栏是否折叠
    const isCollapse = computed(() => !appStore.sidebar.opened && appStore.layout === LayoutEnum.LEFT);
    // 布局方式
    const layout = computed(() => appStore.layout);
    const device = computed(() => appStore.device);

    const route = useRoute();

    const navbar = ref();
    const navbarLogo = ref();
    const navbarRight = ref();

    // const { width: navbarWidth } = useElementSize(navbar);
    // const { width: navbarLogoWidth } = useElementSize(navbarLogo);
    // const { width: navbarRightWidth } = useElementSize(navbarRight);
    // const scrollWidth = computed(() => navbarWidth.value - navbarLogoWidth.value - navbarRightWidth.value);

    // const activeMenu = computed(() => {
    // 	const { meta, path } = route;
    // 	// if set path, the sidebar will highlight the path you set
    // 	if (meta.activeMenu) {
    // 		return meta.activeMenu;
    // 	}
    // 	return path;
    // });
</script>
<style lang="scss" scoped></style>
