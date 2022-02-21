<template>
    <transition name="modal">
        <v-card  id="modal"
        persistent
        max-width="600">
          <v-card-title>
            <span class="text-h5">Modification</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="12"                 
                >
                  <slot name="title"></slot>
                </v-col>               
                <v-col cols="12">
                  <slot name="content"></slot>
                </v-col>
                <v-col cols="12">
                  <slot name="image"></slot>
                </v-col>           
              </v-row>
            </v-container>      
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <slot name="button">
              default body
            </slot>
            
          </v-card-actions>
        </v-card>
      </transition>
</template>

<script>
export default {
}
</script>

<style scoped>
    #modal{
        width: 600px;
    }
</style>