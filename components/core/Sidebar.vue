<template>
  <aside
    class="w-[theme(spacing.sidebar)] z-50 fixed top-3 h-dvh bg-sidebar text-primaryText flex flex-col"
  >
    <!-- Logo -->
    <div class="p-4 text-xl font-bold flex items-center">Ibrahim_ghaybour</div>

    <!-- Menu Items -->
    <nav class="flex-1">
      <div class="text-center text-[2rem]" v-if="groupStore?.loading">
        <span>
          <font-awesome-icon
            class="transition-all animate-spin"
            :icon="'spinner'"
          />
        </span>
      </div>
      <ul v-else class="px-2">
        <li
          @click.self="console.log('')"
          class="relative group my-1 w-full hover:bg-[#404249] transition duration-200 flex items-center rounded-[5px]"
          v-for="item in groups"
          :key="item.id"
        >
          <NuxtLink
            :to="`/${item?.id}`"
            class="w-full p-2 rounded-[5px] truncate"
          >
            <span class="mr-3 opacity-60">
              <font-awesome-icon
                :icon="`${item?.icon ? item?.icon : 'comment-dots'}`"
              />
            </span>
            {{ item.name }}
          </NuxtLink>
          <div
            @click="openSettings(item?.id)"
            class="absolute right-1 opacity-50 transition duration-200 hidden group-hover:block"
          >
            <CoreTooltip :data-tooltip="'Edit Channel'">
              <font-awesome-icon icon="gear" />
            </CoreTooltip>
          </div>
        </li>
      </ul>
    </nav>
  </aside>

  <CorePopup
    v-model:is-open="showSetting"
    :parentClass="'!w-full !h-dvh !rounded-none'"
  >
    <div class="lg:w-[50%] md:w-[70%] mx-auto">
      <ChannelEdit :groupId="selectedGroupId" />
    </div>
  </CorePopup>
</template>

<script setup>
import {
  faCommentDots,
  faGear,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faCommentDots, faGear, faSpinner);

const showSetting = ref(false);
const selectedGroupId = ref(null);
const groupStore = useGroupStore();
const groups = computed(() => groupStore.groupsArray);

const openSettings = (id) => {
  console.log(id);
  selectedGroupId.value = id;
  showSetting.value = true;
};

onMounted(async () => {
  groupStore.fetchGroups();
});
</script>

<style lang="scss" scoped></style>
