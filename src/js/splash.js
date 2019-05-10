export default
    {
        created() {
            var ctx = this;
            setTimeout(function () {
                ctx.$router.push({ name: 'login' });
            }
                .bind(ctx), 2000);
        }
    }