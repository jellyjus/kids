<template>
    <div>
        <el-row class="row-upload">
            <el-col :span="24">
                <el-upload
                        class="uploader"
                        action=""
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :http-request="uploadImage">
                    <div class="uploader-content">
                        <i class="el-icon-picture-outline uploader-icon"></i>
                        <div>
                            <p>Drag files here or select from storage.</p>
                            <p>Allowed JPG and PNG images with size under 3MB.</p>
                        </div>
                    </div>
                </el-upload>
            </el-col>
        </el-row>

        <el-row :gutter="20">
            <el-col :span="12">
                <div class="preview-container">
                    <div class="preview-container-empty" v-if="!currentDimension || !currentDimension.assetUrl">
                        <i class="el-icon-picture-outline preview-icon"></i>
                        <p>Click banner sizes for detailed preview</p>
                    </div>
                    <img :src="currentDimension.assetUrl" class="preview-image" v-else>
                </div>
                <div class="creativeid-info">
                    <i class="el-icon-info"></i> <b>Creative ID: {{creativeId}}</b>
                </div>
            </el-col>

            <el-col :span="12">
                <el-col :span="6" v-for="(typeValue, typeKey) in types[type]" :key="typeKey" class="type-column">
                    <i :class="[typeValue.icon, 'fa', 'dimension-icon']"></i>
                    <div :class="[{'dimension-active': dimension === currentDimension},'dimension']" v-for="dimension in typeValue.dimensions" @click="currentDimension = dimension">
                        <i class="el-icon-success" v-if="dimensionExists(dimension)"></i>
                        {{dimension.width}}x{{dimension.height}}
                    </div>
                </el-col>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "CreativeUpload",
        props: ["type", "creativeSet", "creativeId"],
        data() {
            return {
                currentDimension: null,
                types: {
                    interstitial: {
                        portrait: {
                            icon: "fa-mobile-alt",
                            dimensions: [
                                {width: 900, height: 1600},
                                {width: 900, height: 1400},
                                {width: 1120, height: 1500},
                                {width: 320, height: 480}
                            ]
                        },
                        landscape: {
                            icon: "fa-mobile-alt dimension-icon-reversed",
                            dimensions: [
                                {width: 1600, height: 900},
                                {width: 1560, height: 750},
                                {width: 1500, height: 1120},
                                {width: 480, height: 320}
                            ],
                        },
                        portraitTablet: {
                            icon: "fa-tablet-alt",
                            dimensions: [
                                {width: 768, height: 1024},
                                {width: 1536, height: 2048}
                            ],
                        },
                        landscapeTablet: {
                            icon: "fa-tablet-alt dimension-icon-reversed",
                            dimensions: [
                                {width: 1024, height: 768},
                                {width: 2048, height: 1536}
                            ]
                        },
                    },
                    banner: {
                        landscape: {
                            icon: "fa-mobile-alt dimension-icon-reversed",
                            dimensions: [
                                {width: 320, height: 50},
                                {width: 640, height: 100}
                            ]
                        },
                        landscapeTablet: {
                            icon: "fa-tablet-alt dimension-icon-reversed",
                            dimensions: [
                                {width: 728, height: 90}
                            ]
                        }
                    }
                }
            }
        },
        methods: {
            uploadImage(data) {
                const img = new Image();
                img.onload = () => {
                    this.$http.put(`/creative/${this.creativeId}`, {
                        file: data.file,
                        width: img.width,
                        height: img.height
                    }).then(() => this.$notify.success({
                            title: 'Success',
                            message: 'Image uploaded successfully!'
                        })
                    ).catch(err => this.$notify.error({
                        title: `${err.response.code} ${err.response.name}`,
                        message: err.response.message
                    }));
                };
                img.src = window.URL.createObjectURL(data.file);
            },
            beforeUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024 / 1024 < 3;

                if (!isJPG) {
                    this.$message.error('File must be JPG or PNG format!');
                }
                if (!isLt2M) {
                    this.$message.error('File size can not exceed 3MB!');
                }
                return isJPG && isLt2M;
            },
            dimensionExists(dimension) {
                if (!this.creativeSet)
                    return false;

                const index = this.creativeSet.findIndex(el => el.dimensions.width === dimension.width && el.dimensions.height === dimension.height);
                if (index !== -1)
                    dimension.assetUrl = this.creativeSet[index].assetUrl;
                return index !== -1
            },
            selectImage(dimension) {
                this.currentDimension =  dimension.assetUrl? dimension : null
            }
        }
    }
</script>

<style scoped>
    .row-upload {
        margin-bottom: 40px;
    }

    .uploader {
        border-radius: 6px;
        cursor: pointer;
        border: 1px dashed #d9d9d9;
    }

    .uploader-content {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: left;
        color: #8c939d;
    }

    .uploader-icon {
        font-size: 28px;
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
    }

    .preview-icon {
        font-size: 88px;
        color: #8c939d;
        width: 78px;
        height: 78px;
        line-height: 78px;
        text-align: center;
    }

    .preview-container {
        border: 2px solid #d9d9d9;
        box-shadow: 4px 4px 5px 0 #d9d9d9;
        height: 400px;
        object-fit: contain;
    }

    .preview-container-empty {
        color: #8c939d;
        font-weight: 600;
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .dimension {
        margin: 10px 0;
        padding: 7px;
        border: 1px solid transparent;
    }

    .dimension:hover {
        cursor: pointer;
    }

    .dimension-icon {
        font-size: 28px;
    }

    .dimension-icon-reversed {
        transform: rotate(90deg);
    }
    
    .dimension-active {
        border: 1px solid red;
    }

    .preview-image {
        max-width: 100%;
        max-height: 100%;
        height: inherit;
    }

    .creativeid-info {
        margin-top: 20px;
        text-align: left;
    }

    .creativeid-info i{
        margin-right: 5px;
    }
</style>