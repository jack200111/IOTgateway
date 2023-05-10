<!-- 系统 -->
<template>
    <!-- <h1>{{ title }}</h1> -->
    <!-- <div class="content"> -->
        <!-- <span v-for="(item, index) in zabbixAgent" :key="index+101"> -->
        <!-- 下拉框 -->
        <!-- <p v-if="item.type !== 'button' && item.prop === 'IP类型'">
            <template v-if="item.type === 'select'">
            <span class="prop">{{ item.prop }}:</span>
            <select class="select" v-model="item.selected">
                <option
                v-for="(item2, index2) in item.value"
                :key="index2"
                :value="item2"
                >
                <template v-if="item2 === 'ON' || item2 === 'OFF'">
                    {{ item2 === 'ON' ? '动态' : '静态' }}
                </template>
                <template v-else>
                    {{ item2 }}
                </template>
                </option>
            </select>
            </template>
        </p> -->
        <!-- </span> -->
    <!-- 顺序调整而已 -->
    <!-- 下拉框 -->
          <!-- <span v-for="(item, index) in zabbixAgent" :key="index+101">
            <p v-if="item.type !== 'button' && item.prop === 'IP类型'">
              <template v-if="item.type === 'select'">
                <span class="prop">{{ item.prop }}:</span>
                <select class="select" v-model="item.selected">
                  <option
                    v-for="(item2, index2) in item.value"
                    :key="index2"
                    :value="item2"
                  >
                    <template v-if="item2 === 'ON' || item2 === 'OFF'">
                      {{ item2 === 'ON' ? '动态' : '静态' }}
                    </template>
                    <template v-else>
                      {{ item2 }}
                    </template>
                  </option>
                </select>
              </template>
            </p>
          </span> -->
    <span class="important">
     <span v-for="(item, index) in typeArray" :key="index" :class="cssClass">
        <p v-if="item.type !== 'button' && item.prop !== ifProp">
            <!-- 文本 -->
            <template v-if="item.type === 'text'">
            <span class="prop">{{ item.prop }}:</span>
            <span class="prop-value">{{ item.value }}</span>
            <span class="unit">&nbsp;{{ item.slot }}</span>
            </template>
            <!-- 输入框 -->
            <template v-if="item.type === 'input'">
            <span class="prop">{{ item.prop }}:</span>
            <input type="text" v-model="item.value" :disabled="isDisable"/>
            <span class="unit">&nbsp;{{ item.slot }}</span>
            </template>
            <!-- 下拉框 -->
            <template v-if="item.type === 'select'">
            <span class="prop">{{ item.prop }}:</span>
            <select class="select" v-model="item.selected" :disabled="isDisable">
                <option
                v-for="(item2, index2) in item.value"
                :key="index2"
                :value="item2"
                >
                <template v-if="item2 === 'ON' || item2 === 'OFF'">
                    {{ item2 === 'ON' ? '动态' : '静态' }}
                </template>
                <template v-else>
                    {{ item2 }}
                </template>
                </option>
            </select>
            <span class="unit">&nbsp;{{ item.slot }}</span>
            </template>
            <!-- 单选框 -->
            <span v-if="item.type === 'radio'" class="radioDisplay">
            <span class="prop">{{ item.prop }}:</span>
            <span class="radioSpan">
                <span
                v-for="item2 in item.value"
                :key="item2"
                class="radioFlex"
                >
                <input
                    class="radio"
                    type="radio"
                    :value="item2"
                    v-model="item.selected"
                    :disabled="isDisable"
                />
                <label>{{ item2 }}</label>
                </span>
            </span>
            </span>
            <!-- 复选框 -->
            <span v-if="item.type === 'checkbox'" class="radioDisplay">
            <span class="prop">{{ item.prop }}:</span>
            <span class="radioFlex">
                <input class="radio" type="checkbox" v-model="item.value" :disabled="isDisable"/>
            </span>
            <!-- 可删 -->
            <span class="unit">&nbsp;{{ item.slot }}</span>
            </span>
            <!-- 文本域 -->
            <span v-if="item.type === 'textarea'" class="radioDisplay">
            <span class="prop">{{ item.prop }}:</span>
            <textarea
                v-model="item.value"
                class="textarea"
                :disabled="isDisable"
                placeholder="请输入"
            />
            <span class="unit">&nbsp;{{ item.slot }}</span>
            </span>
        </p>
     </span>
    </span>
    <!-- 按钮 -->
    <!-- <span v-for="item in zabbixAgent" :key="item.prop">
      <template v-if="item.type === 'button'">
        <button class="btn btn1" @click="getSh(item.value)">
          {{ item.prop }}
        </button>
      </template>
    </span> -->
</template>

<script>
// import http from '@/utils/http'
export default {
  props: {
    typeArray: { type: Array, required: true },
    title: { type: String, required: true, default: '' },
    isDisable: { type: Boolean, default: false },
    ifProp: { type: String, required: false, default: 'IP类型' },
    cssClass: { type: String, required: false, default: '' }
  }
}
</script>

<style scoped lang="scss">
.display {
  display: flex;
}
.left {
  margin-right: 80px;
}

.myP{
  p {
      width: 900px;
      border-bottom: 1px solid #ccc;
      height: 42px;
      line-height: 48px;
      position: relative;
      .prop {
        width: 240px;
        display: inline-block;
      }
    }
}
</style>
