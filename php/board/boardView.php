<?php
    include "../connect/connect.php";
    include "../connect/session.php";
    include "../connect/sessionCheck.php";
?>

<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시판</title>
    <?php include "../include/link.php" ?>
</head>
<body>
    <div id="skip">
        <a href="#header">헤더 영역 바로가기</a>
        <a href="#main">컨텐츠 영역 바로가기</a>
        <a href="#footer">푸터 영역 바로가기</a>
    </div>
    <!-- //skip -->
    <?php include "../include/header.php" ?>
    <!-- //header -->

    <main id="main">
        <section id="board" class="container">
        <h2>게시판 보기 영역입니다.</h2>
            <div class="board__inner">
                <div class="board__title">
                    <h3>게시판</h3>
                    <p>웹디자이너, 웹퍼블리셔, 프론트앤드 개발자를 위한 게시판입니다.</p>
                </div>
                <div class="board__view">
                    <table>
                        <colgroup>
                            <col style="width: 20%">
                            <col style="width: 80%">
                        </colgroup>
                        <tbody>
<?php
    $myBoardID = $_GET['myBoardID'];

    // echo $myBoardID;

    // 페이지 뷰 + 1 (UPDATE)
    $sql = "UPDATE myBoard SET boardView = boardView + 1 WHERE myBoardID = {$myBoardID}";
    $connect -> query($sql);
    
    $sql = "SELECT b.boardTitle, m.youName, b.regTime, b.boardView, b.boardContents FROM myBoard b JOIN myMember m ON(m.myMemberID = b.myMemberID) WHERE b.myBoardID = {$myBoardID}";
    $result = $connect -> query($sql);

    
    
    if($result){
        $info = $result -> fetch_array(MYSQLI_ASSOC);

        // echo "<pre>";
        // var_dump($info);
        // echo "<pre>";

        echo "<tr><th>제목</th><td>".$info['boardTitle']."</td></tr>";
        echo "<tr><th>등록자</th><td>".$info['youName']."</td></tr>";
        echo "<tr><th>등록일</th><td>".date('Y-m-d H:i', $info['regTime'])."</td></tr>";
        echo "<tr><th>조회수</th><td>".$info['boardView']."</td></tr>";
        echo "<tr><th>내용</th><td class='height'>".$info['boardContents']."</td></tr>";

    }
?>



                            <!-- <tr>
                                <th>제목</th>
                                <td>게기판 제목입니다.</td>
                            </tr>
                            <tr>
                                <th>등록자</th>
                                <td>황상연</td>
                            </tr>
                            <tr>
                                <th>등록일</th>
                                <td>2022.03.04</td>
                            </tr>
                            <tr>
                                <th>조회수</th>
                                <td>999</td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td class="height">
                                    내가 그린 기린 그림은 잘 그린 기린 그림이고 네가 그린 기린 그림은 잘 못 그린 기린 그림이다.
                                    <br>내가 그린 기린 그림은 목이 긴 기린 그린 그림이고, 네가 그린 기린 그림은 목이 안 긴 기린 그린 그림이다.
                                    <br>스위스에서 오셔서 산새들이 속삭이는 산림 숲속에서 숫사슴을 샅샅이 수색해 식사하고 산 속 샘물로 세수하며 사는 삼십 삼살 샴쌍둥이 미세스 스미스씨와 미스터 심슨씨는 삼성 설립 사장의 회사 자산 상속자인 사촌의 사돈 김상속씨의 숫기있고 숭글숭글한 숫색시 삼성소속 식산업 종사자 김삼순씨를 만나서 삼성 수산물 운송수송 수색 실장에게 스위스에서 숫사슴을 샅샅이 수색했던 것을 인정받아 스위스 수산물 운송 수송 과정에서 상해 삭힌 냄새가 나는 수산물을 수색해내는 삼성 소속 수산물 운송수송 수색 사원이 되서 살신성인으로 쉴새없이 수색하다 산성수에 손이 산화되어 수술실에서 수술하게 됐는데 쉽사리 수술이 잘 안돼서 심신에 좋은 산삼을 달여 슈르릅 들이켰더니 힘이 샘솟아 다시 몸사려 수색하다 삼성 소속 식산업 종사자 김삼순씨와 셋이서 삼삼오오 삼월 삼십 삼일 세시 삼십 삼분 삼십 삼초에 쉰 세살 김식사씨네 시내 스시식당에 식사하러 가서 싱싱한 샥스핀 스시와 삼색샤시참치스시를 살사소스와 슥슥삭삭 샅샅이 비빈 것과 스위스산 소세지를 샤샤샥 싹쓸어 입속에 쑤쎠넣어 살며시 삼키고 스산한 새벽 세시 삼십 삼분 삼십 삼초에 산림 숲속으로 사라졌다.
                                </td>
                            </tr> -->
                        </tbody>
                    </table>
                </div>
                <div class="board__btn">
                    <a href="boardModify.php?myBoardID=<?=$myBoardID?>">수정하기</a>
                    <a href="boardRemove.php?myBoardID=<?=$myBoardID?>" onClick="alert('정말 삭제할거니??')">삭제하기</a>
                    <a href="board.php">목록보기</a>
                </div>
            </div>
        </section>
    </main>

    <?php include "../include/footer.php" ?>
    <!-- //footer -->

</body>
</html>