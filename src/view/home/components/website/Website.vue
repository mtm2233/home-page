<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-26 15:16:09
 * @LastEditTime: 2021-04-28 19:48:40
 * @LastEditors: mTm
-->
<template>
    <div>
        <template v-for="item in website">
            <ARow
                v-if="verifyHide(`t${item.id}`)"
                :key="item.id"
                align="middle"
                class="website"
                :gutter="[15, 50]"
            >
                <ACol span="4" class="website-type">{{ item.name }}</ACol>
                <ACol span="20">
                    <ARow class="website-list" :gutter="[15, 15]">
                        <template v-for="v in item.children">
                            <ACol
                                v-if="verifyHide(`w${v.id}`)"
                                :key="v.id"
                                :xs="8"
                                :sm="6"
                                :lg="4"
                                :xl="4"
                                class="website-list-item"
                                @click="goWebsite(v)"
                            >
                                {{ v.name }}
                            </ACol>
                        </template>
                    </ARow>
                </ACol>
            </ARow>
        </template>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref, inject } from 'vue'

import { websiteByType } from '@/api/website'

export default defineComponent({
    props: {
        type: Number,
    },
    setup(props) {
        const website: Ref<any[]> = ref([])
        const verifyHide = inject('verifyHide')

        const getWebsiteByType = () => {
            if (props.type) {
                websiteByType(props.type).then(({ data }) => {
                    if (Array.isArray(data) && data.length) {
                        website.value = data
                    }
                })
            }
        }

        onMounted(() => {
            getWebsiteByType()
        })

        const goWebsite = (v: any) => {
            if (v.url) {
                window.open(v.url)
            }
        }

        return {
            website,
            goWebsite,
            verifyHide,
        }
    },
})
</script>

<style scoped lang="less">
.website {
    &-type {
        color: #999;
    }
    &-list {
        &-item {
            cursor: pointer;
            transition: all 0.2s ease-in;
            &:hover {
                background: #e5e5e5;
                color: #333;
            }
        }
    }
}
</style>
