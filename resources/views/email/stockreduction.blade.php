<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> {{ config('app.name') . ' Stock reductions ' }}</title>
</head>

<body>
    A user <strong style="text-transform: uppercase">{{ $name }}</strong> adjusted product stocking value by
    <strong>minus {{ $quantity }} units</strong>

    <nav style="border: 1px solid gray; margin: 2rem auto; padding: 2rem;">
        {{ $description }}
    </nav>
</body>

</html>
