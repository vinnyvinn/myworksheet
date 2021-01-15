<template>
    <div>
        <!-- Main content -->
        <section class="content">
            <!-- Default box -->
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">{{edit_worksheet ? 'Update Worksheet' : 'New Worksheet'}}</h3>
                </div>
                <div class="box-body">
                    <form @submit.prevent="saveExpense()">
                        <div class="form-group">
                            <label>Name</label>
                            <input type="text" class="form-control" v-model="form.name" required>
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <input type="text" class="form-control" v-model="form.description" required>
                        </div>
                        <button type="submit" class="btn btn-primary">{{edit_worksheet ? 'Update' : 'Save'}}</button>
                        <button type="button" class="btn btn-outline-danger" @click="cancel">Cancel</button>
                    </form>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
export default {
    props:['edit'],
    data(){
        return {
            form:{
                name:'',
                description:'',
                id:''
            },
            edit_worksheet: this.edit
        }
    },
    created(){
        this.listen();
    },
    methods:{
        saveExpense(){
            this.edit_worksheet ? this.update() : this.save();
        },
        save(){
            delete this.form.id;
            axios.post('worksheets',this.form)
                .then(res => eventBus.$emit('listWorksheets',res.data))
                .catch(error => error.response)
        },
        update(){
            axios.patch(`worksheets/${this.form.id}`,this.form)
                .then(res => {
                    this.edit_worksheet = false;
                    eventBus.$emit('updateWorksheet',res.data);
                })
                .catch(error => error.response)
        },
        cancel(){
            eventBus.$emit('cancel')
        },
        listen(){
            if (this.edit){
                this.form = this.$store.state.worksheet
            }

        },
    }
}
</script>

<style scoped>

</style>
