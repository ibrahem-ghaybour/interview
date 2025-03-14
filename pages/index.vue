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
            class="border-b hover:bg-blog cursor-pointer"
            @click="openUserDetail(user)"
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

    <!-- User Detail Modal -->
    <CorePopup :is-open="showUserDetail" @close="closeUserDetail">
      <div class="p-3 w-full max-w-2xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold">User Details</h2>
        </div>

        <form @submit.prevent="saveUserDetails" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CoreInput
              v-model="editingUser.name"
              :label="'Name'"
              :for-id="'editName'"
              :error="v$.name.$errors[0]?.$message"
            />

              <CoreSelect
                :label="'Role'"
                :for-id="'roleIdSelect21'"
                v-model="editingUser.role"
                :options="['admin', 'moderator', 'user']"
              />
              <CoreSelect
                :label="'Status'"
                :for-id="'StatusSelect21'"
                v-model="editingUser.status"
                :options="['Online', 'Offline']"
              />
            <div>
              <CoreInput
                v-model="editingUser.email"
                :label="'Email'"
                :for-id="'editEmail'"
                type="email"
                :error="v$.email.$errors[0]?.$message"
              />
            </div>
          </div>

          <div class="flex justify-end gap-3 mt-6">
            <button
              type="button"
              @click="confirmDelete"
              class="px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600"
              :disabled="isLoading"
            >
              Delete User
            </button>
            <button
              type="submit"
              class="px-4 py-2 bg-primary text-white rounded-sm hover:opacity-90"
              :disabled="isLoading || v$.$invalid"
            >
              {{ isLoading ? "Saving..." : "Save Changes" }}
            </button>
          </div>
        </form>
      </div>
    </CorePopup>

    <!-- Confirmation Dialog -->
    <Teleport to="body">
      <div
        v-if="showDeleteConfirm"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-blog rounded-sm p-6 w-full max-w-md">
          <h3 class="text-lg font-semibold mb-4">Confirm Delete</h3>
          <p class="mb-6">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
          <div class="flex justify-end gap-3">
            <button
              @click="showDeleteConfirm = false"
              class="px-4 py-2 border rounded-sm"
            >
              Cancel
            </button>
            <button
              @click="deleteUser"
              class="px-4 py-2 bg-red-500 text-white rounded-sm hover:bg-red-600"
              :disabled="isLoading"
            >
              {{ isLoading ? "Deleting..." : "Delete" }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import CoreInput from "~/components/core/Input.vue";
import CorePopup from "~/components/core/Popup.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { ref, computed } from "vue";
import CoreSelect from "~/components/core/Select.vue";

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
const aaa = ref("");
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
    .filter((user) => {
      const matchesSearch = user.name
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase());
      const matchesRole = !roleFilter.value || user.role === roleFilter.value;
      const matchesStatus =
        !statusFilter.value || user.status === statusFilter.value;
      return matchesSearch && matchesRole && matchesStatus;
    })
    .sort((a, b) => {
      const modifier = sortDirection.value === "asc" ? 1 : -1;
      if (a[sortColumn.value] < b[sortColumn.value]) return -1 * modifier;
      if (a[sortColumn.value] > b[sortColumn.value]) return 1 * modifier;
      return 0;
    });
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

// User detail state
const showUserDetail = ref(false);
const showDeleteConfirm = ref(false);
const isLoading = ref(false);
const editingUser = ref({
  id: null,
  name: "",
  role: "",
  status: "",
  email: "",
  avatar: "",
  joinedDate: "",
});

// Validation rules
const rules = {
  name: { required, minLength: minLength(3) },
  email: { required, email },
};

const v$ = useVuelidate(rules, editingUser);

// Methods for user detail handling
const openUserDetail = (user) => {
  editingUser.value = { ...user };
  showUserDetail.value = true;
};

const closeUserDetail = () => {
  showUserDetail.value = false;
  editingUser.value = {
    id: null,
    name: "",
    role: "",
    status: "",
    email: "",
    avatar: "",
    joinedDate: "",
  };
};

const saveUserDetails = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  try {
    isLoading.value = true;
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const userIndex = users.value.findIndex(
      (u) => u.id === editingUser.value.id
    );
    if (userIndex !== -1) {
      users.value[userIndex] = { ...editingUser.value };
    }

    closeUserDetail();
  } catch (error) {
    console.error("Error saving user details:", error);
  } finally {
    isLoading.value = false;
  }
};

const confirmDelete = () => {
  showDeleteConfirm.value = true;
};

const deleteUser = async () => {
  try {
    isLoading.value = true;
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    users.value = users.value.filter((u) => u.id !== editingUser.value.id);

    showDeleteConfirm.value = false;
    closeUserDetail();
  } catch (error) {
    console.error("Error deleting user:", error);
  } finally {
    isLoading.value = false;
  }
};

// Update mock data to include email
users.value = [
  {
    id: 1,
    name: "John Doe",
    role: "admin",
    status: "online",
    joinedDate: "2024-01-15",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    email: "john@example.com",
  },
  // Add more mock users...
];
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
