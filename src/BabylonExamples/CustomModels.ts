import { Scene,Engine, FreeCamera, Vector3, MeshBuilder, CubeTexture, PBRMaterial, Texture, SceneLoader } from "@babylonjs/core";
import "@babylonjs/loaders"
export class CustomModels
{
    scene: Scene;
    engine: Engine;

    constructor(private canvas:HTMLCanvasElement)
    {
        this.engine = new Engine(this.canvas,true);
        this.scene = this.CreateScene();
        //this.CreateGround();
        //this.CreateBarrelAsync();
        this.CreateCampfireAsync();
        this.engine.runRenderLoop(() => 
        {
            this.scene.render();
        })
    }

    CreateScene():Scene
    {
        const scene = new Scene(this.engine);

        const camera = new FreeCamera("camera", new Vector3(0,1,-5), this.scene);
        camera.attachControl();
        camera.speed = 0.25;

        const envTex = CubeTexture.CreateFromPrefilteredData("./environment/beachSky.env",scene);

        scene.environmentTexture = envTex;

        scene.createDefaultSkybox(envTex,true);
        scene.environmentIntensity = 0.5;
        return scene;
    }

    CreateGround():void{
        const ground = MeshBuilder.CreateGround("ground",{width:10,height:10},this.scene);
        ground.material = this.CreateAsphalt();
    }

    CreateAsphalt(): PBRMaterial
    {
        const asphaltMat = new PBRMaterial("pbr",this.scene);
        asphaltMat.albedoTexture = new Texture("./textures/asphalt/asphaltDiffuse.jpg",this.scene);
        
        asphaltMat.bumpTexture = new Texture("./textures/asphalt/asphaltNormal.jpg",this.scene);
        asphaltMat.invertNormalMapX = true;
        asphaltMat.invertNormalMapY = true;

        asphaltMat.useAmbientOcclusionFromMetallicTextureRed = true;
        asphaltMat.useRoughnessFromMetallicTextureGreen = true;
        asphaltMat.useMetallnessFromMetallicTextureBlue = true;
        asphaltMat.metallicTexture = new Texture("./textures/asphalt/asphaltARM.jpg",this.scene);

        //asphaltMat.roughness = 1;

        return asphaltMat;
    }

    CreateBarrel():void {
        // SceneLoader.ImportMesh("","./models/", "Barrel.glb", this.scene,(meshes) => {
        //     console.log("meshes", meshes);
        // })
    }

    async CreateBarrelAsync(): Promise<void> {
        const {meshes} = await SceneLoader.ImportMeshAsync("","./models/","Barrel.glb")

        console.log("meshes",meshes);
    }

    async CreateCampfireAsync(): Promise<void> {
        const models = await SceneLoader.ImportMeshAsync("",
            "./models/",
            "campfire.glb");
    }


}