/**
 * SignupCtrl - controller
 */
function signupCtrl($rootScope, $stateParams, $scope, $state, ownerService, $translate) {

    $scope.sizeLimit      = 105857600; // 10MB in Bytes
    $scope.uploadProgress = 0;

    $scope.upload = function(callback) {
        AWS.config.update({ accessKeyId: 'AKIAJLCHCROG3OCFKK3A', secretAccessKey: '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' });
        AWS.config.region = 'eu-west-1';
        var bucket = new AWS.S3({ params: { Bucket: 'immotrankil.attestations' } });

        if($scope.file) {
            // Perform File Size Check First
            var fileSize = Math.round(parseInt($scope.file.size));
            if (fileSize > $scope.sizeLimit) {
                $scope.errors.push({item:$translate.instant('attestation_limitation')});
                callback('Failed');
            }
            // Prepend Unique String To Prevent Overwrites
            var uniqueFileName = $scope.uniqueString() + '-' + $scope.file.name;

            var params = { Key: uniqueFileName, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

            bucket.putObject(params, function(err, data) {
                if(err) {
                    callback('Failed');
                }
                else {
                    // Reset The Progress Bar
                    setTimeout(function() {
                        $scope.uploadProgress = 0;
                        $scope.$digest();
                    }, 4000);
                }
            })
                .on('httpUploadProgress',function(progress) {
                    $scope.uploadProgress = Math.round(progress.loaded / progress.total * 100);
                    $scope.$digest();
                })
                .on('httpDone',function() {
                    callback(null,'ok');
                });
        }
        else {
            callback('Failed');
        }
    }

    $scope.fileSizeLabel = function() {
        // Convert Bytes To MB
        return Math.round($scope.sizeLimit / 1024 / 1024) + 'MB';
    };

    $scope.uniqueString = function() {
        return $scope.signup.mail + '-' + $scope.file.name;
    }


    $scope.ok = function() {
        $scope.errors = [];

        if ($scope.signup) {

        if ($scope.signup.firstname == null || $scope.signup.firstname == "") {
            $scope.errors.push({item:$translate.instant('prenom')});
        }

        if ($scope.signup.lastname == null || $scope.signup.lastname == "") {
            $scope.errors.push({item:$translate.instant('nom')});
        }

        if ($scope.signup.mail == null || $scope.signup.mail == "") {
            $scope.errors.push({item:$translate.instant('mail')});
        }

        if ($scope.signup.password == null || $scope.signup.password == "") {
            $scope.errors.push({item:$translate.instant('password')});
        }

        if ($scope.signup.password != $scope.signup.password1) {
            $scope.errors.push({item:$translate.instant('password_different')});
        }

            if ($scope.file) {
                if ($scope.file.name == null) {
                    $scope.errors.push({item: $translate.instant('no_attestation')});
                }
            } else {
                $scope.errors.push({item: $translate.instant('no_attestation')});
            }

        if ($scope.errors.length == 0) {
            $scope.upload(function (err, result) {
                if (!err) {
                    ownerService.createOwner($scope.signup).then(
                        function (greeting) {
                            $scope.userOk = true;
                        }, function (reason) {
                            $scope.errors.push({item: "issue_on_registration"});
                        });
                }
            });
        }
        } else {
            $scope.errors.push({item:$translate.instant('issue')});
        }
    }
};

angular
    .module('fup')
    .controller('signupCtrl', signupCtrl);
