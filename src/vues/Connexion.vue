<template>
    <div class="form-demo">
      

        <div class="flex justify-content-center">
            <div class="card">
                <h5 class="text-center">Register</h5>
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                    <div class="field">
                        <div class="p-float-label">
                            <InputText id="name" v-model="v$.name.$model" :class="{'p-invalid':v$.name.$invalid && submitted}" />
                            <label for="name" :class="{'p-error':v$.name.$invalid && submitted}">Name*</label>
                        </div>
                        <small v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response" class="p-error">{{v$.name.required.$message.replace('Value', 'Name')}}</small>
                    </div>
                    <div class="field">
                        <div class="p-float-label p-input-icon-right">
                            <i class="pi pi-envelope" />
                            <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
                            <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
                        </div>
                        <span v-if="v$.email.$error && submitted">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                            </span>
                        </span>
                        <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
                    </div>
                    <div class="field">
                        <div class="p-float-label">
                            <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}" toggleMask>
                                <template #header>
                                    <h6>Pick a password</h6>
                                </template>
                                <template #footer="sp">
                                    {{sp.level}}
                                    <Divider />
                                    <p class="mt-2">Suggestions</p>
                                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                        <li>At least one lowercase</li>
                                        <li>At least one uppercase</li>
                                        <li>At least one numeric</li>
                                        <li>Minimum 8 characters</li>
                                    </ul>
                                </template>
                            </Password>
                            <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password*</label>
                        </div>
                        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
                    </div>
                    <div class="field">
                        <div class="p-float-label">
                            <Calendar id="date" v-model="date" :showIcon="true" />
                            <label for="date">Birthday</label>
                        </div>
                    </div>
                    <div class="field">
                        <div class="p-float-label">
                            <Dropdown id="country" v-model="country" :options="countries" optionLabel="name" />
                            <label for="country">Country</label>
                        </div>
                    </div>
                    <div class="field-checkbox">
                        <Checkbox id="accept" name="accept" value="Accept" v-model="v$.accept.$model" :class="{'p-invalid':v$.accept.$invalid && submitted}" />
                        <label for="accept" :class="{'p-error': v$.accept.$invalid && submitted}">I agree to the terms and conditions*</label>
                    </div>
                    <Button type="submit" label="Submit" class="mt-2" />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue';
import { email, required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";
import CountryService from '../service/CountryService';

export default {
    setup() {
        onMounted(() => {
            countryService.value.getCountries().then(data => countries.value = data);
        })

        const state = reactive({
            name: '',
            email: '',
            password: '',
            accept: null
        });

        const rules = {
            name: { required },
            email: { required, email },
            password: { required },
            accept: { required }
        };

        const countryService = ref(new CountryService());
        const submitted = ref(false);
        const countries = ref();
        const showMessage = ref(false);
        const date = ref();
        const country = ref();

        const v$ = useVuelidate(rules, state);

        const handleSubmit = (isFormValid) => {
            submitted.value = true;

            if (!isFormValid) {
                return;
            }

            toggleDialog();
        }
        const toggleDialog = () => {
            showMessage.value = !showMessage.value;
        
            if(!showMessage.value) {
                resetForm();
            }
        }
        const resetForm = () => {
            state.name = '';
            state.email = '';
            state.password = '';
            state.date = null;
            state.country = null;
            state.accept = null;
            submitted.value = false;
        }

        return { state, v$, handleSubmit, toggleDialog, submitted, countries, showMessage, date, country }
    }
}
</script>

<style lang="scss" scoped>
html {
        font-size: 14px;
    }

    body {
        background-color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
        font-weight: normal;
        color: #495057;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        padding: .5em;
        margin-bottom: 50px;
    }

    h1, h2, h3, h4, h5, h6 {
        margin: 1.5rem 0 1rem 0;
        font-family: inherit;
        font-weight: 600;
        line-height: 1.2;
        color: inherit;
    }

    h1 { font-size: 2.5rem; }
    h2 { font-size: 2rem; }
    h3 { font-size: 1.75rem; }
    h4 { font-size: 1.5rem; }
    h5 { font-size: 1.25rem; }
    h6 { font-size: 1rem; }
    p {
        line-height: 1.5;
        margin: 0 0 1rem 0;
    }

    .card {
        margin-bottom: 2rem;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    @keyframes pulse {
        0% {
            background-color: rgba(165, 165, 165, 0.1)
        }
        50% {
            background-color: rgba(165, 165, 165, 0.3)
        }
        100% {
            background-color: rgba(165, 165, 165, 0.1)
        }
    }

    .customer-badge {
        border-radius: 2px;
        padding: .25em .5rem;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 12px;
        letter-spacing: .3px;
    }

    .customer-badge.status-qualified {
        background-color: #C8E6C9;
        color: #256029;
    }

    .customer-badge.status-unqualified {
        background-color: #FFCDD2;
        color: #C63737;
    }

    .customer-badge.status-negotiation {
        background-color: #FEEDAF;
        color: #8A5340;
    }

    .customer-badge.status-new {
        background-color: #B3E5FC;
        color: #23547B;
    }

    .customer-badge.status-renewal {
        background-color: #ECCFFF;
        color: #694382;
    }

    .customer-badge.status-proposal {
        background-color: #FFD8B2;
        color: #805B36;
    }

    .product-badge {
        border-radius: 2px;
        padding: .25em .5rem;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 12px;
        letter-spacing: .3px;
    }

    .product-badge.status-instock {
        background: #C8E6C9;
        color: #256029;
    }

    .product-badge.status-outofstock {
        background: #FFCDD2;
        color: #C63737;
    }

    .product-badge.status-lowstock {
        background: #FEEDAF;
        color: #8A5340;
    }

    .order-badge {
        border-radius: 2px;
        padding: .25em .5rem;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 12px;
        letter-spacing: .3px;
    }

    .order-badge.order-delivered {
        background: #C8E6C9;
        color: #256029;
    }

    .order-badge.order-cancelled {
        background: #FFCDD2;
        color: #C63737;
    }

    .order-badge.order-pending {
        background: #FEEDAF;
        color: #8A5340;
    }

    .order-badge.order-returned {
        background: #ECCFFF;
        color: #694382;
    }

    .image-text {
        margin-left: .5rem;
    }

    .p-multiselect-representative-option {
        display: inline-block;
        vertical-align: middle;
    }

    .p-multiselect-representative-option img {
        vertical-align: middle;
        width: 24px;
    }

    .p-multiselect-representative-option span {
        margin-top: .125rem;
    }

    .country-item {
        display: flex;
        align-items: center;
    }

    .country-item img.flag {
        width: 18px;
        margin-right: .5rem;
    }

    .flag {
        vertical-align: middle;
    }

    span.flag {
        width:44px;
        height:30px;
        display:inline-block;
    }

    img.flag {
        width:30px
    }

    .true-icon {
        color: #256029;
    }

    .false-icon {
        color: #C63737;
    }
    
    
.form-demo {
    .card {
        min-width: 450px;

        form {
            margin-top: 2rem;
        }

        .field {
            margin-bottom: 1.5rem;
        }
    }

    @media screen and (max-width: 960px) {
        .card {
            width: 80%;
        }
    }
}

</style>

