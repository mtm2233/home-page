<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-26 15:20:03
 * @LastEditTime: 2021-04-26 18:32:10
 * @LastEditors: mTm
-->
<template>
    <div class="type">
        <div class="type-box">
            <ATabs v-model:activeKey="activeKey" class="type-box-list">
                <ATabsPane v-for="v in typeList" :key="v.id" :tab="v.name" />
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
import { defineComponent, Ref, ref, onMounted, watch } from 'vue'
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
        }
    },
})
</script>
<style scoped lang="less">
.type {
    padding: 30px 20px;
    background: #f7f7f7;
    &-box {
        max-width: 900px;
        margin: 0 auto;
        text-align: center;
        &-list {
            padding-bottom: 30px;
            /deep/ .ant-tabs-tab {
                transition: all 0.2s ease-in;
                &:hover {
                    background: #e5e5e5;
                    color: #333;
                }
            }
            /deep/ .ant-tabs-tab-active {
                background: #e5e5e5;
                color: #333;
            }
        }
        /deep/ .ant-tabs-bar {
            border: none;
        }
        /deep/ .ant-tabs-ink-bar {
            display: none !important;
        }
    }
}
</style>
