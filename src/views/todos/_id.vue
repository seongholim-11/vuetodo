<template lang="">
    <div class="wrap">
        <div v-if="loading">Loading...</div>
        <form v-else @submit.prevent="saveTodo">
            <div class="row">
                <div class="form-group">
                    <label>Todo Subject</label>
                    <input type="text" v-model="todo.subject" />
                </div>
                <div class="form-group">
                    <div>
                        <label>Status: </label>
                        <button
                            class="btn"
                            type="button"
                            :class="todo.completed ? 'btnG' : 'btnR'"
                            @click="toggleTodoStatus"
                        >
                            {{ todo.completed ? "완료" : "미완료" }}
                        </button>
                    </div>
                    <div>
                        <button class="btn" @click="moveToTodoListPage">
                            취소
                        </button>
                        <button
                            class="btn btnR"
                            type="submit"
                            :disabled="!todoUpdated"
                        >
                            저장
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { ref, computed } from "vue";
import _ from "lodash";

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: "",
            completed: false,
        });
        const loading = ref(true);
        const todoId = route.params.id;
        const originalTodo = ref(null);

        const getTodo = async () => {
            const res = await axios.get(
                `http://localhost:3000/todos/` + todoId
            );
            todo.value = { ...res.data };
            originalTodo.value = { ...res.data };
            loading.value = false;
        };
        getTodo();

        const toggleTodoStatus = () => {
            if (todo.value) {
                todo.value.completed = !todo.value.completed;
            }
        };

        const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value);
        });

        const saveTodo = async () => {
            const res = await axios.put(
                `http://localhost:3000/todos/${todoId}`,
                todo.value
            );
            originalTodo.value = { ...res.data };
            router.push({ name: "todos" });
        };

        const moveToTodoListPage = () => {
            router.push({
                name: "todos",
            });
        };

        return {
            todo,
            loading,
            toggleTodoStatus,
            saveTodo,
            moveToTodoListPage,
            todoUpdated,
        };
    },
};
</script>
<style lang="scss">
.wrap {
    width: 1000px;
    margin: 0 auto;
    h1 {
        text-align: center;
    }
    > div {
    }
    > form {
        .row {
            .form-group {
                display: flex;
                flex-direction: column;
                align-items: center;
                > div {
                    margin: 10px;
                }
                label {
                    margin: 10px;
                }
                input {
                    padding: 5px 20px;
                    box-sizing: border-box;
                }
            }
        }
        .btn {
            border: none;
        }
        .btnR {
            background-color: red;
            color: #fff;
        }
        .btnG {
            background-color: green;
            color: #fff;
        }
    }
}
</style>
