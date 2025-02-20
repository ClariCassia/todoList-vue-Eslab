import type { Task } from '@/types/task';
import { defineStore } from 'pinia';

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [] as Task[],
        selectedFilter: 'todas' as 'todas' | 'pendentes' | 'concluidas',
    }),

    /**
     * Filtra as tarefas com base no filtro selecionado.
     * 
     * Retorna um array de tarefas filtradas com base no valor de `selectedFilter`:
     * - Se o filtro for "pendentes", retorna as tarefas que estão pendentes.
     * - Se o filtro for "concluidas", retorna as tarefas que estão concluídas.
     * - Caso contrário, retorna todas as tarefas.
     * 
     * @getter filteredTasks
     * @param {Object} state - O estado atual da store.
     * @param {Task[]} state.tasks - A lista de tarefas.
     * @param {string} state.selectedFilter - O filtro selecionado, podendo ser "todas", "pendentes" ou "concluidas".
     * @returns {Task[]} Um array de tarefas filtradas de acordo com o filtro selecionado.
     */
    getters: {
        filteredTasks(state): Task[] {
            if (state.selectedFilter === 'pendentes') {
                return state.tasks.filter(task => task.pending);
            } else if (state.selectedFilter === 'concluidas') {
                return state.tasks.filter(task => !task.pending);
            }
            return state.tasks;
        }
    },

    actions: {

        /**
         * Define o filtro de tarefas selecionado.
         * 
         * Este método altera o valor de `selectedFilter` para um dos três filtros possíveis: 
         * "todas", "pendentes" ou "concluidas". O filtro selecionado será usado para 
         * filtrar as tarefas na lista de acordo com o estado desejado.
         * 
         * @method setFilter
         * @param {'todas' | 'pendentes' | 'concluidas'} filter - O filtro a ser aplicado. Pode ser um dos seguintes valores:
         *   - 'todas': Para mostrar todas as tarefas.
         *   - 'pendentes': Para mostrar apenas as tarefas pendentes.
         *   - 'concluidas': Para mostrar apenas as tarefas concluídas.
         * @returns {void}
         */
        setFilter(filter: 'todas' | 'pendentes' | 'concluidas') {
            this.selectedFilter = filter;
        },

        /**
         * Adiciona uma nova tarefa à lista de tarefas, se ainda não existir uma tarefa com o mesmo nome.
         * 
         * Este método verifica se já existe uma tarefa com o mesmo nome na lista de tarefas. 
         * Se não houver, ele adiciona a nova tarefa como pendente (`pending: true`) e 
         * então salva a lista de tarefas.
         * 
         * @method addTask
         * @param {Task} task - A tarefa a ser adicionada. Deve conter uma propriedade `name` (nome da tarefa) e a tarefa será marcada como pendente.
         * @returns {void}
         */
        addTask(task: Task) {
            if (!this.tasks.some(existingTask => existingTask.name === task.name)) {
                this.tasks.push({ name: task.name, pending: true });
            }
            this.saveTasks();
        },

        /**
        * Edita o nome de uma tarefa existente na lista de tarefas.
        * 
        * Este método altera o nome de uma tarefa no índice especificado, desde que o novo nome 
        * não seja vazio ou composto apenas por espaços em branco. Se o novo nome for válido, 
        * ele substitui o nome da tarefa no índice correspondente.
        * 
        * @method editTask
        * @param {number} index - O índice da tarefa na lista de tarefas que será editada.
        * @param {string} newName - O novo nome para a tarefa.
        * @returns {void}
        */
        editTask(index: number, newName: string) {
            if (!newName.trim()) return;
            this.tasks[index].name = newName;
        },

        /**
        * Salva a lista de tarefas no armazenamento local do navegador.
        * 
        * Este método converte a lista de tarefas em uma string JSON e a armazena no `localStorage` 
        * do navegador, usando a chave `'tasks'`. Isso permite que as tarefas sejam persistidas 
        * entre as sessões do usuário, desde que o navegador suporte o `localStorage`.
        * 
        * @method saveTasks
        * @returns {void}
        */
        saveTasks() {
            if (typeof window !== 'undefined') {
                localStorage.setItem('tasks', JSON.stringify(this.tasks));
            }
        },

        /**
 * Alterna o estado de conclusão de uma tarefa.
 * 
 * Este método altera o status de uma tarefa entre pendente e concluída no índice 
 * especificado. Se a tarefa estiver marcada como pendente (`pending: true`), ela será 
 * marcada como concluída (`pending: false`), e vice-versa. Após a alteração, a lista 
 * de tarefas é salva no `localStorage`.
 * 
 * @method toggleTask
 * @param {number} index - O índice da tarefa na lista de tarefas cuja conclusão será alternada.
 * @returns {void}
 */
        toggleTask(index: number) {
            this.tasks[index].pending = !this.tasks[index].pending;
            this.saveTasks();
        },

        /**
         * Remove uma tarefa da lista de tarefas.
         * 
         * Este método remove a tarefa localizada no índice especificado da lista de tarefas. 
         * Após a remoção, a lista de tarefas é salva novamente no `localStorage` para persistência.
         * 
         * @method removeTask
         * @param {number} index - O índice da tarefa a ser removida da lista de tarefas.
         * @returns {void}
         */
        removeTask(index: number) {
            this.tasks.splice(index, 1);
            this.saveTasks();
        },

        /**
         * Remove todas as tarefas da lista.
         * 
         * Este método limpa a lista de tarefas, removendo todas as tarefas armazenadas. 
         * Após a limpeza, a lista é salva no `localStorage` para garantir que a alteração 
         * seja persistida entre as sessões do usuário.
         * 
         * @method clearTasks
         * @returns {void}
         */
        clearTasks() {
            this.tasks = [];
            this.saveTasks();
        },
    },
    /**
     * Define se os dados devem ser persistidos.
     * 
     * Esta propriedade é usada para indicar se os dados devem ser persistidos, 
     * geralmente em um armazenamento local ou sessão, para que possam ser recuperados 
     * mesmo após o fechamento ou recarregamento da aplicação. Quando definida como `true`, 
     * os dados serão salvos e mantidos entre as sessões.
     * 
     * @property {boolean} persist
     * @default true
     */
    persist: true,
});
