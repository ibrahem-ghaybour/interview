<template>
  <div class="container mx-auto p-4">
    <!-- Search and Filter Section -->
    <div class="mb-6 flex flex-wrap gap-4">
      <CoreInput
        :label="'Search users...'"
        :for-id="'searchQueryIndex'"
        v-model="searchQuery"
      ></CoreInput>
      <select
        v-model="roleFilter"
        class="px-4 py-2 !border-none rounded-sm !outline-none bg-primary focus:bg-blog"
      >
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
        <option value="user">User</option>
      </select>
      <select
        v-model="statusFilter"
        class="px-4 py-2 !border-none rounded-sm !outline-none bg-primary focus:bg-blog"
      >
        <option value="">All Status</option>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>
    </div>

    <!-- Users Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-blog rounded-sm shadow">
        <thead class="bg-primary">
          <tr>
            <th
              v-for="header in tableHeaders"
              :key="header.key"
              class="px-6 py-3 text-left"
              @click="sortBy(header.key)"
            >
              {{ header.label }}
              <span v-if="sortColumn === header.key">
                {{ sortDirection === "asc" ? "↑" : "↓" }}
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="border-b hover:bg-blog"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <img
                  :src="user.avatar"
                  :alt="user.name"
                  class="w-8 h-8 rounded-full"
                />
                {{ user.name }}
              </div>
            </td>
            <td class="px-6 py-4">
              <span
                :class="{
                  'px-2 py-1 rounded-full text-sm': true,
                  'bg-blue-100 text-blue-800': user.role === 'admin',
                  'bg-green-100 text-green-800': user.role === 'moderator',
                  'bg-gray-100 text-gray-800': user.role === 'user',
                }"
              >
                {{ user.role }}
              </span>
            </td>
            <td class="px-6 py-4">
              <span
                :class="{
                  'flex items-center gap-2': true,
                  'text-green-600': user.status === 'online',
                  'text-gray-500': user.status === 'offline',
                }"
              >
                <div
                  :class="{
                    'w-2 h-2 rounded-full': true,
                    'bg-green-500': user.status === 'online',
                    'bg-gray-400': user.status === 'offline',
                  }"
                ></div>
                {{ user.status }}
              </span>
            </td>
            <td class="px-6 py-4">{{ formatDate(user.joinedDate) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <div>
        Showing {{ paginationStart + 1 }} to {{ paginationEnd }} of
        {{ filteredUsers.length }} users
      </div>
      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded-sm disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage >= totalPages"
          class="px-4 py-2 border rounded-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const showPopup = ref(false);
useHead({
  title: "Discord ibrahim",
  description: "The design of Wi-Fi is somewhat similar to Discord.",
});

// Table headers
const tableHeaders = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "joinedDate", label: "Joined Date" },
];

// State
const searchQuery = ref("");
const roleFilter = ref("");
const statusFilter = ref("");
const sortColumn = ref("name");
const sortDirection = ref("asc");
const currentPage = ref(1);
const itemsPerPage = 10;

// Mock data - Replace with actual API call
const users = ref([
  {
    id: 1,
    name: "John Doe",
    role: "admin",
    status: "online",
    joinedDate: "2024-01-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  // Add more mock users here
]);

// Computed properties
const filteredUsers = computed(() => {
  return users.value

});

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage)
);

const paginationStart = computed(() => (currentPage.value - 1) * itemsPerPage);
const paginationEnd = computed(() =>
  Math.min(paginationStart.value + itemsPerPage, filteredUsers.value.length)
);

const paginatedUsers = computed(() => {
  return filteredUsers.value.slice(paginationStart.value, paginationEnd.value);
});

// Methods
const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = column;
    sortDirection.value = "asc";
  }
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
}

table {
  border-collapse: separate;
  border-spacing: 0;
}

th {
  cursor: pointer;
  user-select: none;

  &:hover {
    // background-color: #f3f4f6;
  }
}
</style>
