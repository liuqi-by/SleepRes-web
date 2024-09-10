<!-- 二次确认的switch -->
<template>
    <el-switch
        v-bind="$attrs"
        v-model="val"
        :before-change="beforStatusChange"
    />
</template>

<script setup lang="ts">
    const { t } = useI18n();

    const props = defineProps({
        msgOff: {
            type: String,
            default: 'users.statusOff',
        },
        msgOn: {
            type: String,
            default: 'users.statusOn',
        },
    });

    const val = defineModel<boolean>({
        default: false,
    });

    const beforStatusChange = () => {
        return new Promise<boolean>((resolve, reject) => {
            ElMessageBox.confirm(' ', val.value ? t(props.msgOn) : t(props.msgOff), {
                confirmButtonText: t('form.Confirm'),
                cancelButtonText: t('form.Cancel'),
                type: 'warning',
                customStyle: { minHeight: 0, top: '-15vh' },
                dangerouslyUseHTMLString: true,
            })
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    reject(false);
                });
        });
    };
</script>

<style lang="scss" scoped></style>
