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
                @open="handleOpen"
                @close="handleClose"
                ref="sliderMenu"
            >
                <div
                    v-for="item in permission_routes"
                    :key="item.path"
                >
                    <div v-if="item.children">
                        <div v-if="permission_routes.length === 1">
                            <el-menu-item
                                v-for="child in item.children"
                                :key="child.path"
                                :index="child.path"
                                :title="$t(`router.${child.meta?.title}`)"
                            >
                                <span>{{ $t(`router.${child.meta?.title}`) }}</span>
                            </el-menu-item>
                        </div>
                        <el-sub-menu
                            v-else
                            :index="item.path"
                            :expand-open-icon="Minus"
                            :expand-close-icon="Plus"
                            :collapse-open-icon="Minus"
                            :collapse-close-icon="Plus"
                        >
                            <template #title>
                                <div>{{ $t(`router.${item.meta?.title}`) }}</div>
                            </template>
                            <div
                                v-for="child in item.children"
                                :key="child.path"
                            >
                                <el-menu-item
                                    :index="child.path"
                                    :title="$t(`router.${child.meta?.title}`)"
                                    v-show="!child.meta?.isParent"
                                >
                                    <span>{{ $t(`router.${child.meta?.title}`) }}</span>
                                </el-menu-item>
                            </div>
                        </el-sub-menu>
                    </div>

                    <el-menu-item
                        v-else
                        :title="$t(`router.${item.meta?.title}`)"
                        :index="item.path"
                    >
                        <span>{{ $t(`router.${item.meta?.title}`) }}</span>
                    </el-menu-item>
                </div>
                <!-- <el-menu-item
                    :title="$t(`router.${item.meta?.title}`)"
                    :index="item.path"
                    v-for="item in permission_routes"
                    :key="item.path"
                >
                    <span>{{ $t(`router.${item.meta?.title}`) }}</span>
                </el-menu-item> -->

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
    import { Plus, Minus } from '@element-plus/icons-vue';
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
    const permission_routes = computed(() => permissionStore.menuRoute);
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
    const isFirstOpen = ref(true);
    const handleOpen = (path: string) => {
        if (!isFirstOpen.value) {
            if (path === 'tasks') {
                navigateTo('/tasks');
            }
        } else {
            isFirstOpen.value = false;
        }
    };

    const sliderMenu = ref();
    const handleClose = (path: string) => {
        if (path === 'tasks') {
            if (useRoute().path !== '/tasks') {
                navigateTo('/tasks');
                sliderMenu.value?.open(path);
            }
        }
    };
</script>
<style lang="scss" scoped></style>
