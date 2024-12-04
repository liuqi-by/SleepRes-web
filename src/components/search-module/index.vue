<template>
    <!-- 搜索模块 -->
    <div class="search-module">
        <div class="search-module-item">
            <div class="search-module-item-label">{{ $t('form.Search') }}</div>
            <el-input
                v-model="searchOption"
                :placeholder="placeholder"
                @keydown.enter="search"
                maxlength="30"
            />
        </div>
        <!-- <div class="search-module-item">
                <div class="search-module-item-label">Name</div>
                <el-input
                    v-model="searchOption.name"
                    placeholder="Please input"
                />
            </div>
            <div class="search-module-item">
                <div class="search-module-item-label">Account</div>
                <el-input
                    v-model="searchOption.account"
                    placeholder="Please input"
                />
            </div>
            <div class="search-module-item">
                <div class="search-module-item-label">State</div>
                <select-state v-model="searchOption.state" />
            </div> -->
        <base-button
            type="primary"
            @click="search"
        >
            <base-svg-icon
                icon="search"
                size="22px"
            />
        </base-button>
    </div>
</template>

<script setup lang="ts">
    const searchOption = defineModel({
        type: String,
        default: '',
    });

    defineProps<{
        placeholder?: string;
    }>();

    const emit = defineEmits<{
        search: [];
    }>();

    const search = () => {
        emit('search');
        console.log(searchOption.value);
    };
</script>

<style lang="scss" scoped>
    .search-module {
        display: flex;
        padding: 20px;
        border: 1px solid var(--el-border-color);
        border-radius: var(--el-border-radius-base);

        .search-module-item {
            display: flex;
            flex: 1;
            align-items: center;
            min-width: 400px;
            max-width: 600px;
            margin-right: 30px;

            .search-module-item-label {
                width: 60px;
                margin-right: 20px;
            }
        }

        // @media screen and (width <= 768px) {
        //     flex-wrap: wrap;
        //     padding-bottom: 0;

        //     .search-module-item {
        //         margin-bottom: 20px;

        //         .search-module-item-label {
        //             width: 80px;
        //         }
        //     }
        // }
    }
</style>
