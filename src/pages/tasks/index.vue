<template>
    <div class="page-container">
        <div class="module">
            <h1>{{ $t('router.adherence') }} {{ $t('tasks.tasks') }}</h1>
            <h2>Initial 90 Day Status</h2>
            <div class="ad-cards">
                <div
                    class="ad-card"
                    @click="navigateTo('/tasks/adherence?type=2')"
                >
                    <div class="ad-card__title bg-[#e86474]">At Risk</div>
                    <ul>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                    </ul>
                </div>
                <div
                    class="ad-card"
                    @click="navigateTo('/tasks/adherence?type=1')"
                >
                    <div class="ad-card__title bg-[#ffff64]">Opportunity</div>
                    <ul>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                    </ul>
                </div>
                <div
                    class="ad-card"
                    @click="navigateTo('/tasks/adherence?type=0')"
                >
                    <div class="ad-card__title bg-[#03bf16]">Good</div>
                    <ul>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">Day 7</span>
                            <span class="ad-card__value">56 {{ $t('tasks.patients') }}</span>
                        </li>
                    </ul>
                </div>
                <div
                    class="ad-card"
                    @click="navigateTo('/tasks/adherence?type=3')"
                >
                    <div class="ad-card__title bg-[#65c9f6]">Adherence Met</div>
                    <ul>
                        <li>
                            <span class="ad-card__label">6/10/2024</span>
                            <span class="ad-card__value">156 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">6/10/2024</span>
                            <span class="ad-card__value">156 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">6/10/2024</span>
                            <span class="ad-card__value">156 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">6/10/2024</span>
                            <span class="ad-card__value">156 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">6/10/2024</span>
                            <span class="ad-card__value">156 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">6/10/2024</span>
                            <span class="ad-card__value">156 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">6/10/2024</span>
                            <span class="ad-card__value">156 {{ $t('tasks.patients') }}</span>
                        </li>
                        <li>
                            <span class="ad-card__label">6/10/2024</span>
                            <span class="ad-card__value">156 {{ $t('tasks.patients') }}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="module">
            <h1>{{ $t('router.Long-term-adherence') }} {{ $t('tasks.tasks') }}</h1>
            <div class="task-link">
                <div class="task-link__item">XXXX {{ $t('tasks.patients') }}</div>
                <base-button
                    type="primary"
                    height="40px"
                    @click="navigateTo('/tasks/Long-term-adherence')"
                >
                    {{ $t('tasks.ViewPatientList') }}
                </base-button>
            </div>
        </div>
        <div class="module">
            <h1>{{ $t('rules.Clinical') }} {{ $t('tasks.tasks') }}</h1>
            <div class="m-b-20px">
                <h2>{{ $t('router.High-Leak') }}</h2>
                <div class="task-link">
                    <div class="task-link__item">XXXX {{ $t('tasks.patients') }}</div>
                    <base-button
                        type="primary"
                        height="40px"
                        @click="navigateTo('/tasks/High-Leak')"
                    >
                        {{ $t('tasks.ViewPatientList') }}
                    </base-button>
                </div>
            </div>
            <div>
                <h2>{{ $t('router.High-AHI') }}</h2>
                <div class="task-link">
                    <div class="task-link__item">XXXX {{ $t('tasks.patients') }}</div>
                    <base-button
                        type="primary"
                        height="40px"
                        @click="navigateTo('/tasks/High-AHI')"
                    >
                        {{ $t('tasks.ViewPatientList') }}
                    </base-button>
                </div>
            </div>
        </div>
        <div class="module">
            <h1>{{ $t('tasks.Connectivity') }} {{ $t('tasks.tasks') }}</h1>
            <div class="m-b-20px">
                <h2>{{ $t('tasks.CellularModule') }}</h2>
                <div class="task-link">
                    <div class="task-link__item">XXXX {{ $t('tasks.patients') }}</div>
                    <base-button
                        type="primary"
                        height="40px"
                    >
                        {{ $t('tasks.ViewPatientList') }}
                    </base-button>
                </div>
            </div>
            <div>
                <h2>{{ $t('tasks.W-FiModule') }}</h2>
                <div class="task-link">
                    <div class="task-link__item">XXXX {{ $t('tasks.patients') }}</div>
                    <base-button
                        type="primary"
                        height="40px"
                    >
                        {{ $t('tasks.ViewPatientList') }}
                    </base-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
    .page-container {
        padding-top: 20px;
    }

    .module {
        padding: 25px 0;
        border-top: 1px solid #000;

        h1 {
            margin-bottom: 15px;
            font-size: $font-large;
            font-weight: bold;
        }

        h2 {
            margin-bottom: 15px;
            font-size: $font-small;
            font-weight: bold;
        }

        &:first-child {
            padding-top: 0;
            border-top: none;
        }

        &:last-child {
            padding-bottom: 0;
        }
    }

    .ad-cards {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;

        .ad-card {
            width: 240px;
            margin-right: 60px;
            margin-bottom: 20px;
            cursor: pointer;

            &:hover {
                opacity: 0.9;
            }

            ul {
                padding: 10px;
                border: 1px solid #000;

                li {
                    display: flex;
                    justify-content: space-between;
                    line-height: 30px;
                }
            }
        }

        .ad-card__title {
            font-size: $font-standard;
            font-weight: bold;
            line-height: 40px;
            text-align: center;
        }
    }

    .task-link {
        display: flex;
        align-items: center;
        font-size: $font-standard;
        font-weight: bold;

        .task-link__item {
            margin-right: 40px;
        }

        .el-button {
            font-size: inherit;
        }
    }
</style>
