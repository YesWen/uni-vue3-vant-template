<script setup>
import { onLaunch } from "@dcloudio/uni-app";
import { init } from "@/common/index";

onLaunch((options) => {
    init(options);
});
</script>

<style lang="scss">
@import "static/style/index.scss";
</style>
