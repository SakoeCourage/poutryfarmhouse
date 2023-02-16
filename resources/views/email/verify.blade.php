<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> {{ config('app.name') . ' verify email' }}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;

        }

        .maincontainer {
            display: flex;
            align-items: center;
            justify-content: center;
            height: max-content;
            min-width: 100vw;
            padding: 1.5rem;
            background-color: #f3f4f6;
        }

        .contentholder {
            max-width: 35rem;
            padding: 3rem;
            text-align: center;
            min-width: 30rem;
            background-color: #fff;
            color: #d1d5db;
            border-radius: 0.5rem;
            position: relative;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        }

        .text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
        }

        .appnamebadge {
            position: absolute;
            top: 0.5rem;
            right: 1.25rem;
            color: #9ca3af;
            padding: 0.5rem;
            width: max-content;
            margin: 0 auto;
            border-radius: 0.375rem
        }

        .credentials {
            box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
            margin: 0 auto;
            background-color: #eff6ff;
            border-radius: 0.375rem;
            padding: 1.25rem;
            border: 1px solid #60a5fa;
            margin-top: 1rem;
            margin-bottom: 1rem;
        }

        .text-xl {
            font-size: 1.25rem;
            line-height: 1.75rem;
        }

        .font-semibold {
            font-weight: 600;
        }

        .text-gray-400 {
            color: #9ca3af;
        }

        .w-full {
            width: 100%;
        }

        .text-blue-400 {
            color: #60a5fa;
        }

        .underline {
            text-decoration: underline;
        }

        .text-gray-500 {
            color: #6b7280;
        }

        .text-left {
            text-align: left;
        }

        .mt-4 {
            margin-top: 1rem;
        }

        .link-to-verify {
            padding: 0.5rem;
            border-radius: 0.25rem;
            color: #bfdbfe;
            background-color: #2563eb;
            text-decoration: none;
        }
    </style>
</head>

<body>
    <div class="maincontainer"
        style="    display: flex;
            align-items: center;
            justify-content: center;
            height:max-content ;
            min-width: 100vw;
            padding: 1.5rem;">
        <div class="contentholder "
            style=" max-width: 35rem;
        padding: 3rem;
        text-align: center;
        min-width: 30rem;
        background-color: #fff;
        color: #d1d5db;
        border-radius: 0.5rem;
        position: relative;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;">
            <h4 class=" text-sm appnamebadge  ">
                {{ config('app.name') }}</h4>
            <h3 class="text-xl font-semibold text-gray-400"
                style="
            font-size: 1.25rem;
            line-height: 1.75rem;
            font-weight: 600;
            color: #9ca3af;
                ">
                Your account has been created</h3>
            <div class="credentials"
                style="
                       box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
            margin: 0 auto;
            background-color: #eff6ff;
            border-radius: 0.375rem;
            padding: 1.25rem;
            border: 1px solid #60a5fa;
            margin-top: 1rem;
            margin-bottom: 1rem;
                ">

                <table class="w-full  " style="width: 100%">

                    <tr>
                        <td class="">email</td>
                        <td style="
                             font-size: 0.875rem;
                             line-height: 1.25rem;
                             font-weight: 600;
                             color: #60a5fa;
                             text-decoration: underline;
                             "
                            class="text-sm font-semibold text-blue-400 underline"> {{ $email }}</td>
                    </tr>
                    <tr>
                        <td>password</td>
                        <td style="  font-size: 0.875rem;
                        line-height: 1.25rem;
                        font-weight: 600; 
                        color: #64748b;
                        "
                            class="text-sm font-semibold"> {{ $password }}</td>
                    </tr>
                </table>
            </div>
            <ul class="list-disc px-5"
                style="
                 padding-left: 1.25rem;
                 padding-right: 1.25rem;
                ">
                <li style="
                 font-size: 0.875rem;
                line-height: 1.25rem;
                text-align: left;
             color: #6b7280;

                
                "
                    class="text-gray-500 text-sm text-left">You can now sign in using the credentials above</li>

            </ul>

            <div style="margin-top: 1rem;" class="mt-4">
                <a style="
                  padding: 0.5rem;
            border-radius: 0.25rem;
            color: #bfdbfe;
            background-color: #2563eb;
            text-decoration: none;
                
                "
                    target="__blank" href="{{ env('BASE_URL') }}/login" class="link-to-verify">Click here to
                    continue</a>
            </div>
        </div>
    </div>
</body>

</html>
