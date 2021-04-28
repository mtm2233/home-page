<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-26 15:20:03
 * @LastEditTime: 2021-04-28 19:48:23
 * @LastEditors: mTm
-->
<template>
    <div class="type">
        <div class="type-box">
            <ATabs v-model:activeKey="activeKey" class="type-box-list">
                <template v-for="v in typeList">
                    <ATabsPane
                        v-if="verifyHide(`t${v.id}`)"
                        :key="v.id"
                        :tab="v.name"
                    />
                </template>
            </ATabs>
            <template v-for="v in typeList">
                <Website
                    v-if="activateList.includes(v.id)"
                    v-show="v.id === activeKey"
                    :key="v.id"
                    :type="v.id"
                />
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref, onMounted, watch, inject } from 'vue'

import { list } from '@/api/type'
import Website from '../website/Website.vue'

export default defineComponent({
    name: 'Type',
    components: {
        Website,
    },
    setup() {
        const typeList: Ref<any[]> = ref([])
        const activeKey: Ref<number | null> = ref(null)
        const verifyHide = inject('verifyHide')

        const getTypeList = () => {
            list().then(({ data }) => {
                if (Array.isArray(data) && data.length) {
                    activeKey.value = data[0].id
                    typeList.value = data
                }
            })
        }

        const activateList: Ref<any[]> = ref([])
        watch(
            activeKey,
            val => {
                activateList.value = [...new Set([...activateList.value, val])]
            },
            { deep: true },
        )

        onMounted(() => {
            getTypeList()
        })

        return {
            typeList,
            activeKey,
            activateList,
            verifyHide,
        }
    },
})
</script>
<style scoped lang="less">
.type {
    padding: 40px 20px;
    background: #f7f7f7;
    &-box {
        max-width: 900px;
        margin: 0 auto;
        text-align: center;
        &-list {
            padding-bottom: 20px;
            :deep(.ant-tabs-tab) {
                transition: all 0.2s ease-in;
                &:hover {
                    background: #e5e5e5;
                    color: #333;
                }
            }
            :deep(.ant-tabs-tab-active) {
                background: #e5e5e5;
                color: #333;
            }
        }
        :deep(.ant-tabs-bar) {
            border: none;
        }
        :deep(.ant-tabs-ink-bar) {
            display: none !important;
        }
    }
}
</style>
