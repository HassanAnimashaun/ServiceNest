<script setup>
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
auth.fetchUser();
</script>

<template>
  <router-view />
</template>
