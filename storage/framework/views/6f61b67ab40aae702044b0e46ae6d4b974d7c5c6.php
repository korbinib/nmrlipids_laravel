<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no,maximum-scale=1.0, user-scalable=no" />
    <meta name="description" content="Nmrlipids" />
    <meta name="author" content="NMRlipids Databank" />
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>" />

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="NMRlipids Databank">
    <meta property="og:title" content="NMRlipids Databank">
    <meta property="og:description" content="NMRlipids Databank">
    <meta property="og:url" content="https://databank.nmrlipids.fi/">
    <meta property="og:locale" content="en_US">
    <meta property="og:image" content="https://databank.nmrlipids.fi/storage/images/nmr_w_letras.png">
    <!-- Favicon-->
    <link rel="icon" type="image/x-icon" href="<?php echo e(asset('favicon.ico')); ?>" />
    <!-- Bootstrap Icons-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
    <!-- Google fonts-->
    <link href="https://fonts.googleapis.com/css?family=Merriweather+Sans:400,700" rel="stylesheet" />
    <link href="https://fonts.googleapis.com/css?family=Merriweather:400,300,300italic,400italic,700,700italic" rel="stylesheet" type="text/css" />
    <!-- SimpleLightbox plugin CSS-->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/SimpleLightbox/2.1.0/simpleLightbox.min.css" rel="stylesheet" />
    <!-- Jquery UI plugin CSS-->
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <!-- Core theme CSS (includes Bootstrap)-->
    <link href="<?php echo e(asset('css/styles.css')); ?>" rel="stylesheet" />
    <!--  SLIDER -->
    <link href="<?php echo e(asset('css/multislider.css')); ?>" rel="stylesheet" />

    <?php echo $__env->yieldContent('meta-tags'); ?>
    
     <!-- Styles -->
     <link href="<?php echo e(asset('css/app.css')); ?>" rel="stylesheet">
     <link href="<?php echo e(asset('css/custom.css')); ?>" rel="stylesheet">

<!-- End Add template -->


    <!-- CSRF Token -->
    <meta name="csrf-token" content="<?php echo e(csrf_token()); ?>">

    <title><?php echo e(config('app.name')); ?></title>

    <!-- Fonts
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    -->
    <!--<link rel="shortcut icon" href="<?php echo e(asset('favicon.ico')); ?>">-->
    <!-- <link rel="icon" type="image/png" href="<?php echo e(asset('favicon.png')); ?>"> -->

    <!-- nouislider -->
    <link href="<?php echo e(asset('storage/js/nouislider/nouislider.min.css')); ?>" rel="stylesheet" />
    <script type="text/javascript" src="<?php echo e(asset('storage/js/nouislider/nouislider.min.js')); ?>"></script>
    <script type="text/javascript" src="<?php echo e(asset('storage/js/nouislider/wNumb.min.js')); ?>"></script>

    <!-- JSMOL -->
    <script type="text/javascript" src="<?php echo e(asset('storage/js/jsmol/JSmol.min.js')); ?>"></script> 


   <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>

   <!--  AUTOCOMPLETE -->
     <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js" integrity="sha256-T0Vest3yCU7pafRw9r+settMBX6JkKN06dqBnpQ8d30=" crossorigin="anonymous"></script>

  <!--SLIDER -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"   crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

     <!-- Chart -->
     <!--<script type="text/javascript"  src="https://cdn.jsdelivr.net/npm/chart.js"></script>-->
     <script type="text/javascript"  src="https://unpkg.com/chart.js@3.8.2"></script>

     <script type="text/javascript"  src="https://unpkg.com/chartjs-chart-error-bars@3"></script>



</head>
<?php /**PATH /home/nmrlipid/databank.nmrlipids.fi/databank/laravel/resources/views/layouts/head.blade.php ENDPATH**/ ?>