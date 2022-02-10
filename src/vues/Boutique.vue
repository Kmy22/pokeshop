import DataView from 'primevue/dataview';

export default {
    data() {
        return {
            cars: null,
        }
    },
    carService: null,
    created() {
        this.carService = new CarService();
    },
    mounted() {
        this.carService.getCarsLarge().then(data => this.cars = data);
    }
}


<template #list="slotProps">
	<div class="col-12">
        <div class="car-details">
            <div>
                <img :src="'demo/images/car/' + slotProps.data.brand + '.png'" :alt="slotProps.data.brand"/>
                <div class="grid">
                    <div class="col-12">Vin: <b>{{slotProps.data.vin}}</b></div>
                    <div class="col-12">Year: <b>{{slotProps.data.year}}</b></div>
                    <div class="col-12">Brand: <b>{{slotProps.data.brand}}</b></div>
                    <div class="col-12">Color: <b>{{slotProps.data.color}}</b></div>
                </div>
            </div>
            <Button icon="pi pi-search"></Button>
        </div>
    </div>
</template>
<template #grid="slotProps">
	<div style="padding: .5em" class="col-12 md:col-3">
		<Panel :header="slotProps.data.vin" style="text-align: center">
			<img :src="'demo/images/car/' + slotProps.data.brand + '.png'" :alt="slotProps.data.brand"/>
			<div class="car-detail">{{slotProps.data.year}} - {{slotProps.data.color}}</div>
			<Button icon="pi pi-search"></Button>
		</Panel>
	</div>
</template>

<template #header>Header Content</template>
<template #footer>Footer Content</template>
<template #empty>No records found.</template>
<DataView :value="cars" :layout="layout">
	<template #header>
		<DataViewLayoutOptions v-model="layout"></DataViewLayoutOptions>
	</template>
	<template #list="slotProps" >
		<div>Vin: <b>{{slotProps.data.vin}}</b></div>
	</template>
	<template #grid="slotProps">
		<div>Vin: <b>{{slotProps.data.vin}}</b></div>
	</template>
</DataView>

