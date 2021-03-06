/**
 * The LIBRARY application build on open source technologis
 * and follow APACHE License 2.0 Jan 2004
 * @author Nhựt Nguyễn
 * @version 1.0
 * @since 15/04/2018
 */
$(function () {

    const URL_CHECK_LOGIN = "/checkLogin.do"; // @Request: Kiểm tra đăng nhập
    const URL_SELECT_LIST_ADMIN = "/selectListAdmin.do"; // @Request: Lấy danh sách tên của ban quản trị
    const URL_SELECT_LIST_PROBLEM = "/selectListProblem.do"; // @Request: Lấy danh sách các vấn đề
    const URL_INSERT_CONTACT = "/insertContact.do"; // @Request: Thêm mới liên hệ

    let setup = function () {
        checkLogin();
        selectListAdminAndProblem();
        sendContact();
    }

    /* @Function: Xử lý các nghiệp vụ đăng nhập */
    let checkLogin = function () {
        $('#btnConfirm').on('click', function () {
            let tenDangNhap = $('#tenDangNhap').val();
            let matKhau = $('#matKhau').val();
            if (tenDangNhap.length < 3) {
                $.confirm({
                    title: 'Tài khoản bạn nhập không hợp lệ',
                    content: '',
                    type: 'dark',
                    typeAnimated: true,
                    buttons: {
                        tryAgain: {
                            text: 'Thử lại',
                            btnClass: 'btn-mdb-color',
                        },
                    }
                });
            } else if (matKhau.length < 3) {
                $.confirm({
                    title: 'Mật khẩu bạn nhập không hợp lệ',
                    content: '',
                    type: 'dark',
                    typeAnimated: true,
                    buttons: {
                        tryAgain: {
                            text: 'Thử lại',
                            btnClass: 'btn-mdb-color',
                        },
                    }
                });
            } else {
                $.ajax({
                    url: URL_CHECK_LOGIN
                    , data: {
                        "tenTaiKhoan": tenDangNhap,
                        "matKhau": matKhau
                    }
                    , type: "POST"
                    , success: function (data) {
                        if (data) {
                            window.location.href = "/homepage.do"; //Chuyển sang trang @homepage.jsp
                        } else {
                            $.confirm({
                                title: 'Đăng nhập không thành công',
                                content: 'Vui lòng kiểm tra lại tài khoản hoặc mật khẩu',
                                type: 'dark',
                                typeAnimated: true,
                                buttons: {
                                    tryAgain: {
                                        text: 'Thử lại',
                                        btnClass: 'btn-mdb-color',
                                    },
                                }
                            });
                        }
                    }
                });
            }
        })
    };

    /* @Function: Xử lý nghiệp vụ lấy danh sách ban quản trị & vấn đề */
    let selectListAdminAndProblem = function () {
        $('#btnContact').on('click', function () {
            $.ajax({
                url: URL_SELECT_LIST_ADMIN,
                type: "POST",
                success: function (data) {
                    if (data) {
                        $.each(data, function (i) {
                            $('#selAdminName').append('<option value="' + data[i]["idNhanVien"] + '">' + data[i]["tenNhanVien"] + '</option>');
                        })
                    }
                }
            });
            $.ajax({
                url: URL_SELECT_LIST_PROBLEM,
                type: "POST",
                success: function (data) {
                    if (data) {
                        $.each(data, function (i) {
                            $('#selProblem').append('<option value="' + data[i]["idVanDe"] + '">' + data[i]["tenVanDe"] + '</option>');
                        })
                    }
                }
            });
        })
    };

    /* @Function: Xử lý nghiệp vụ gửi liên hệ */
    let sendContact = function () {
        $('#btnSentContact').on('click', function () {
            let idNhanVien = $('#selAdminName').val();
            let idVanDe = $('#selProblem').val();
            let sdt = $('#sdt').val();
            let noiDung = $('#noiDung').val();

            if (sdt.length < 9 || sdt.length > 11) {
                $.confirm({
                    title: 'Số điện thoại bạn nhập không hợp lệ',
                    content: '',
                    type: 'dark',
                    typeAnimated: true,
                    buttons: {
                        tryAgain: {
                            text: 'Thử lại',
                            btnClass: 'btn-mdb-color',
                        },
                    }
                });
            } else if (noiDung.length < 1) {
                $.confirm({
                    title: 'Xin vui lòng nhập nội dung',
                    content: '',
                    type: 'dark',
                    typeAnimated: true,
                    buttons: {
                        tryAgain: {
                            text: 'Thử lại',
                            btnClass: 'btn-mdb-color',
                        },
                    }
                });
            } else {
                $.ajax({
                    url: URL_INSERT_CONTACT,
                    data: {
                        'idNhanVien': idNhanVien,
                        'idVanDe': idVanDe,
                        'sdt': sdt,
                        'noiDung': noiDung
                    },
                    type: "POST",
                    success: function (data) {
                        if (data) {
                            $.confirm({
                                title: 'Đã gửi liên hệ thành công',
                                content: 'Cảm ơn bạn đã gửi liên hệ. Vui lòng chờ thời gian phản hồi từ ban quản trị',
                                type: 'dark',
                                typeAnimated: true,
                                buttons: {
                                    confirm: {
                                        text: 'Xác nhận',
                                        btnClass: 'btn-mdb-color',
                                        action: function () {
                                            window.location.href = "/"; //Chuyển sang trang @index.jsp
                                        }
                                    },
                                }
                            });
                        } else {
                            $.confirm({
                                title: 'Gửi liên hệ thất bại',
                                content: 'Đã có lỗi xảy ra từ hệ thống, xin vui lòng thử lại hoặc liên hệ đến ban quản trị',
                                type: 'dark',
                                typeAnimated: true,
                                buttons: {
                                    confirm: {
                                        text: 'Xác nhận',
                                        btnClass: 'btn-mdb-color',
                                    },
                                }
                            });
                        }
                    }
                });
            }
        })
    };

    return setup();
});