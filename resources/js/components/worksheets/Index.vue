<template>
    <div>
        <work-sheets v-if="add_worksheet" :edit="editing"></work-sheets>
        <!-- Main content -->
        <section class="content" v-if="!add_worksheet">
            <!-- Default box -->
            <div class="box">
                <div class="box-body">
                    <v-app id="inspire">
                        <v-card>
                            <v-card-title>
                                Worksheets
                                <v-spacer></v-spacer>
                                <v-text-field
                                    v-model="search"
                                    append-icon="mdi-magnify"
                                    label="Search"
                                    single-line
                                    hide-details
                                ></v-text-field>
                                <v-spacer></v-spacer>
                                <download-excel
                                    :data   = "tableData"
                                    :title = "title"
                                    v-if="tableData.length"
                                    name="worksheets.xlsx"
                                    class="btn btn-primary pull-right"
                                >
                                    <i class="fa fa-file-excel-o"></i> Print Worksheet
                                </download-excel>
                                <v-btn small color="indigo" dark @click="add_worksheet=true" class="mr">Add Worksheet
                                </v-btn>
                            </v-card-title>
                            <v-data-table
                                v-model="selected"
                                :headers="headers"
                                :items="items"
                                :single-select="singleSelect"
                                :sort-by.sync="sortBy"
                                :sort-desc.sync="sortDesc"
                                :search="search"
                                item-key="name"
                                class="elevation-1"
                                :footer-props="{
                              showFirstLastPage: true,
                              firstIcon: 'mdi-arrow-collapse-left',
                              lastIcon: 'mdi-arrow-collapse-right',
                              prevIcon: 'mdi-minus',
                              nextIcon: 'mdi-plus'
                              }"
                            >
                                <template v-slot:item.actions="{ item }">
                                    <v-btn class="mx-1 my-1" fab dark color="indigo" small>
                                        <v-icon dark small @click="editWorksheet(item)">mdi-pencil</v-icon>
                                    </v-btn>

                                </template>

                            </v-data-table>
                        </v-card>
                    </v-app>
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import WorkSheets from "./Worksheet";
    import datatable from "../../mixins/datatable";
    import FieldDefs from "./FieldDefs";
    import {mapGetters} from 'vuex';
    export default {
        mixins:[datatable],
        data(){
            return {
                importing:false,
                add_worksheet:false,
                editing: false,
                headers: FieldDefs
            }
        },
        created(){
            this.getWorksheets();
            this.listen();
        },
        computed:{
            ...mapGetters({
               tableData:'all_worksheets'
            }),
            getWorksheets(){
                this.$store.dispatch('my_worksheet').then(() => {
                    if (this.tableData.length == undefined) {
                        setTimeout(() => {
                            this.getItems();
                        }, 2000);
                    }else {
                        this.getItems();
                    }
                })
            },
        },
        methods:{
            editWorksheet(worksheet){
                this.$store.dispatch('updateWorksheet',worksheet)
                    .then(() =>{
                        this.editing=true;
                        this.add_worksheet=true;
                    })
            },
            deleteCustomer(id){
                axios.delete(`worksheets/${id}`)
                    .then(res => {
                        for (let i=0;i<this.tableData.length;i++){
                            if (this.tableData[i].id == res.data){
                                this.tableData.splice(i,1);
                            }
                        }
                    })
                    .catch(error => Exception.handle(error))
            },
            listen(){
                eventBus.$on('listWorksheets',(worksheet) =>{
                    this.getItems();
                    this.add_worksheet =false;
                });
                eventBus.$on('cancel',()=>{
                    this.add_worksheet = false;
                    this.editing = false;
                });
                eventBus.$on('updateWorksheet',(worksheet)=>{
                    this.add_worksheet = false;
                    this.editing = false;
                    for (let i=0;i<this.tableData.length;i++){
                        if (this.tableData[i].id == worksheet.id){
                            this.tableData.splice(i,1);
                        }
                    }
                    this.tableData.unshift(worksheet);
                });
            },
        },
    components:{
        WorkSheets
    }
    }
</script>

<style scoped>

</style>
