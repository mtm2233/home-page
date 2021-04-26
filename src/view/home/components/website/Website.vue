<!--
 * @Description: 
 * @Author: mTm
 * @Date: 2021-04-26 15:16:09
 * @LastEditTime: 2021-04-26 21:42:06
 * @LastEditors: mTm
-->
<template>
    <div>
        <ARow
            v-for="item in website"
            :key="item.id"
            align="middle"
            class="website"
            :gutter="[0, 15]"
        >
            <ACol span="4" class="website-type">{{ item.name }}</ACol>
            <ACol span="20">
                <ARow class="website-list" :gutter="[15, 15]">
                    <ACol
                        v-for="v in item.children"
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
                </ARow>
            </ACol>
        </ARow>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { websiteByType } from '@/api/website'

export default defineComponent({
    props: {
        type: Number,
    },
    setup(props) {
        const website: Ref<any[]> = ref([])

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
